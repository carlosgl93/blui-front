import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from './index';
import { defaultEmailSender, paymentSettings } from './config';
import axios from 'axios';

const sendEmailUrl = process.env.SEND_EMAIL_URL;

export const transactionResultNotify = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
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
    // validating if request has appointmentId
    if (!appointmentId) {
      logger.error('there was no appointmentId within the query', query);
      res.status(400).send('Missing document ID in request');
      return;
    }

    let appointmentInfo: FirebaseFirestore.DocumentData | undefined;
    const db = getFirestore();
    try {
      const docRef = db.collection('appointments').doc(String(appointmentId));
      logger.info('retrieving appointment document with id:', appointmentId);
      const docSnapshot = await docRef.get();
      appointmentInfo = docSnapshot.data();
      if (!docSnapshot.exists) {
        throw new Error('Appointment document does not exist');
      }
      if (status === 'success') {
        await docRef.update({
          isPaid: 'Pagado',
        });
        const paymentDate = new Date();
        const paymentsCollectionRef = db.collection('payments');
        const paymentQuerySnapshot = await paymentsCollectionRef
          .where('appointmentId', '==', appointmentId)
          .get();
        if (paymentQuerySnapshot.empty) {
          await paymentsCollectionRef.add({
            appointmentId,
            status: 'pending',
            paymentDate: new Date(),
            paymentDueDate: new Date(
              paymentDate.getTime() + paymentSettings.providerPayAfterDays * 24 * 60 * 60 * 1000,
            ),
            amount: appointmentInfo?.servicio?.price * (1 - paymentSettings.appCommission),
          });
        }
      } else {
        await docRef.delete();
        res.status(422).send('Payment failed');
        return;
      }
    } catch (error) {
      logger.error('error updating appointment', error);
      res.status(500).send('Error updating appointment');
      return;
    }
    try {
      // const rawToken = await token;
      const emailsCollectionRef = db.collection('emails');
      const emailSnap = await emailsCollectionRef.where('appointmentId', '==', appointmentId).get();
      if (emailSnap.empty) {
        logger.info('inside emailSnap empty');
        await axios.post(String(sendEmailUrl), {
          method: 'post',
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
        });
        const emailRegistered = await emailsCollectionRef.add({
          appointmentId,
          sent: true,
          date: new Date(),
        });

        logger.info('email sent and record created', emailRegistered);
        res.status(200).send('Email notification sent successfully');
      }
    } catch (error) {
      logger.error('error sending the email notification', error);
      res.status(500).send('error sending the email notification');
      return;
    }
  },
);
