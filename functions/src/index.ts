import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';
import { getAccessToken } from './utils/getAccessToken';
import {
  sendEmail,
  userPaidAppointment,
  sendVerificationEmail,
  transactionResultNotify,
} from './functions';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { deleteUnpaidAppointments, markSessionsReadyToPay } from './pubsubs';

setGlobalOptions({ region: 'southamerica-west1', timeoutSeconds: 15 });
const credential = applicationDefault();
const token = getAccessToken(credential);
// Initialize Firebase Admin
const app = initializeApp({
  credential: credential,
  storageBucket: 'blui-6ec33.appspot.com',
});

// Export the initialized services
export {
  app,
  getStorage,
  getAuth,
  getFirestore,
  token,
  sendEmail,
  userPaidAppointment,
  sendVerificationEmail,
  transactionResultNotify,
  deleteUnpaidAppointments,
  markSessionsReadyToPay as markAsreadyToPayDoneSessions,
};
