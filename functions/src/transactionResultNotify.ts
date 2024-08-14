import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from './index';

export const transactionResultNotify = onRequest(
  { region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ body, query }, res) => {
    logger.info('beggining transaction result');

    const { status } = body;
    const { appointmentId } = query;

    if (!appointmentId) {
      logger.error('there was no appointmentId within the query', query);
      res.status(400).send('Missing document ID in request');
      return;
    }
    const db = getFirestore();
    const docRef = db.collection('appointments').doc(String(appointmentId));
    try {
      logger.info('retrieving document:', docRef);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        if (status === 'success') {
          await docRef.update({
            isPaid: 'Pagado',
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
