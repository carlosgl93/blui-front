import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from './index';

import { defaultEmailSender, paymentSettings, sendEmailUrl } from './config';
import axios from 'axios';

export const transactionResultNotify = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ body, query, method }, res) => {
    if (method !== 'POST') {
      res.status(500).send(`Method ${method} not supported`);
    }
    if (method === 'OPTIONS') {
      logger.info('options running');
      res.send(200);
      return;
    }

    logger.info('beggining transaction result', body);
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
    const id = String(appointmentId);

    let appointmentInfo: FirebaseFirestore.DocumentData | undefined;
    const db = getFirestore();
    try {
      const docRef = db.collection('appointments').doc(id);
      logger.info('retrieving appointment document with id:', id);
      const docSnapshot = await docRef.get();
      appointmentInfo = docSnapshot.data();
      if (!docSnapshot.exists) {
        throw new Error('Appointment document does not exist');
      }
      if (status === 'success' && appointmentInfo?.isPaid !== 'Pagado') {
        await docRef.update({
          isPaid: 'Pagado',
          status: 'Pagada',
        });
        const paymentDate = new Date();
        const paymentDocRef = db.collection('payments').doc(id);
        // const paymentQuerySnapshot = await paymentsCollectionRef
        //   .where('appointmentId', '==', appointmentId)
        //   .get();
        const paymentRecord = await paymentDocRef.get();
        if (!paymentRecord.exists) {
          await paymentDocRef.create({
            ...appointmentInfo,
            appointmentId,
            paymentStatus: 'pending',

            paymentDate: new Date(),
            paymentDueDate: new Date(
              paymentDate.getTime() + paymentSettings.providerPayAfterDays * 24 * 60 * 60 * 1000,
            ),
            amountToPay: appointmentInfo?.servicio?.price * (1 - paymentSettings.appCommission),
          });
        }
      } else if (status === 'success' && appointmentInfo?.isPaid === 'Pagado') {
        res.status(200).send('Appointment successfuly scheduled');
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
        logger.info('beginning sending email notification');
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
