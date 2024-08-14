import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getAuth, getFirestore } from './index';
import { defaultEmailSender, paymentSettings } from './config';
import axios from 'axios';

const sendEmailUrl = process.env.SEND_EMAIL_URL;

export const transactionResultNotify = onRequest(
  { region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ body, query, method }, res) => {
      if (method === 'OPTIONS') {
        logger.info('options running');
        res.send(200);
        return;
      }
    logger.info('beggining transaction result');

    const { status } = body;
    const { appointmentId } = query;
    if (!status) {
      logger.error('there was no status within the body', body);
      res.status(400).send('Missing status in request body');
      return;
    }
    if (!appointmentId) {
      logger.error('there was no appointmentId within the query', query);
      res.status(400).send('Missing document ID in request');
      return;
    }
    const db = getFirestore();
    const auth = getAuth();
    const docRef = db.collection('appointments').doc(String(appointmentId));
    try {
      logger.info('retrieving appointment document with id:', appointmentId);
      const docSnapshot = await docRef.get();
      const appointmentInfo = docSnapshot.data();
      logger.info('appointment details', appointmentInfo);
      if (docSnapshot.exists) {
        if (status === 'success') {
          await docRef.update({
            isPaid: 'Pagado',
          });
          const token = await auth.getUser(appointmentInfo?.customer?.id);
          await axios.post(`${sendEmailUrl}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              providerName: appointmentInfo?.provider.firstname,
              customerName: appointmentInfo?.customer.firstname,
              serviceName: appointmentInfo?.servicio.name,
              scheduledDate: appointmentInfo?.scheduledDate,
              scheduledTime: appointmentInfo?.scheduledTime,
              templateName: 'scheduled-appointment.html',
              options: {
                from: defaultEmailSender,
                to: appointmentInfo?.provider?.email,
                subject: 'Nueva sesión agendada',
                text: `Hola ${appointmentInfo?.provider?.firstname}, tienes una nueva sesión de ${appointmentInfo?.servicio.name} confirmada para el día ${appointmentInfo?.scheduledDate} a las ${appointmentInfo?.scheduledTime} con ${appointmentInfo?.customer?.firstname} ${appointmentInfo?.customer?.lastname}`,
              },
            },
          });
          const paymentDate = new Date();
          await db.collection('payments').add({
            appointmentId: appointmentId,
            status: 'pending',
            paymentDate: new Date(),
            paymentDueDate: new Date(
              paymentDate.getTime() + paymentSettings.providerPayAfterDays * 24 * 60 * 60 * 1000,
            ),
            amount: appointmentInfo?.servicio?.price * (1 - paymentSettings.appCommission),
          });
          res.status(200).send('Appointment updated successfully');
          return;
        } else {
          await docRef.update({
            isPaid: 'failed',
          });
          res.status(422).send('Payment failed');
          return;
        }
      } else {
        res
          .status(404)
          .send(`Appointment under id: ${appointmentId} either doesnt exist or was deleted`);
        return;
      }
    } catch (error) {
      logger.error('error updating appointment', error);
      res.status(500).send('Error updating appointment');
      return;
    }
  },
);
