import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from './index';

export const transactionResultNotify = onRequest(
  { cors: true, region: 'southamerica-west1', memory: '128MiB', maxInstances: 1 },
  async ({ headers, body, query }, res) => {
    logger.info('beggining notification of transaction', headers, body);
    // const serviceAccount = require('../firebase-adminsdk.json');
    // const app = initializeApp({
    //   credential: serviceAccount,
    // });

    const { appointmentId } = query;
    console.log(appointmentId);

    if (!appointmentId) {
      res.status(400).send('Missing document ID in request');
      return;
    }
    // getting the sesion document
    const db = getFirestore();
    const docRef = db.collection('appointments').doc(appointmentId as string);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      await docRef.update({
        isPaid: true,
      });
      res.status(200).send('Appointment updated successfully');
      return;
    } else {
      res
        .status(404)
        .send(`Appointment under id: ${appointmentId} either doesnt exist or was deleted`);
      return;
    }
  },
);
