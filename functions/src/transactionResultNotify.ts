import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from './index';

export const transactionResultNotify = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ headers, body, query }, res) => {
    logger.info('beggining notification of transaction', headers, body);
    logger.info('body', body);
    logger.info('QUERY', query);
    

    const { status } = body;
    const { appointmentId } = query;

    if (!appointmentId) {
      res.status(400).send('Missing document ID in request');
      return;
    }
    const db = getFirestore();
    const docRef = db.collection('appointments').doc(appointmentId as string);
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
        res.status(400).send('Payment was not approved');
        return;
      }
    } else {
      res
        .status(404)
        .send(`Appointment under id: ${appointmentId} either doesnt exist or was deleted`);
      return;
    }
  },
);
