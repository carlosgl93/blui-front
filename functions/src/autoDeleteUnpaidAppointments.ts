import { getFirestore } from './index';
import { pubsub } from 'firebase-functions';
import * as logger from 'firebase-functions/logger';

const db = getFirestore();

export const deleteUnpaidAppointments = pubsub.schedule('every day 00:00').onRun(async () => {
  try {
    const appointmentsRef = db.collection('appointments');
    const unpaidAppointmentsSnapshot = await appointmentsRef
      .where('status', '==', 'Pendiente de pago')
      .get();

    if (unpaidAppointmentsSnapshot.empty) {
      logger.info('No unpaid appointments found.');
      return null;
    }

    const batch = db.batch();
    unpaidAppointmentsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    logger.info('Unpaid appointments deleted successfully.');
  } catch (error) {
    logger.error('Error deleting unpaid appointments:', error);
  }

  return null;
});
