import { setGlobalOptions } from 'firebase-functions/v2/options';
import { userPaidAppointment } from './userPaidAppointment';
import { sendEmail } from './sendEmail';
import * as cors from 'cors';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import { sendVerificationEmail } from './sendVerificationEmail';

cors({ origin: true });
setGlobalOptions({ region: 'southamerica-west1', timeoutSeconds: 15 });

// Initialize Firebase Admin
initializeApp({
  credential: applicationDefault(),
  storageBucket: 'blui-6ec33.appspot.com',
});

// Export the initialized services
export { getStorage, getAuth, userPaidAppointment, sendEmail, sendVerificationEmail};
