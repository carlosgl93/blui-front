import { setGlobalOptions } from 'firebase-functions/v2/options';
import { userPaidAppointment } from './userPaidAppointment';
import { sendEmail } from './sendEmail';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { sendVerificationEmail } from './sendVerificationEmail';
import { transactionResultNotify } from './transactionResultNotify';
import { getAccessToken } from './utils/getAccessToken';

setGlobalOptions({ region: 'southamerica-west1', timeoutSeconds: 15 });
const credential = applicationDefault();
const token = getAccessToken(credential)
// Initialize Firebase Admin
initializeApp({
  credential: credential,
  storageBucket: 'blui-6ec33.appspot.com',
});

// Export the initialized services
export {
  getStorage,
  getAuth,
  getFirestore,
  token,
  userPaidAppointment,
  sendEmail,
  sendVerificationEmail,
  transactionResultNotify,
};
