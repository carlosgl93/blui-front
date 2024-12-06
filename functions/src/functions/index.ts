import { HttpsOptions } from 'firebase-functions/v2/https';

export * from './sendEmail';
export * from './userPaidAppointment';
export * from './sendVerificationEmail';
export * from './transactionResultNotify';

export const defaultFunctionSettings = {
  cors: true,
  region: 'southamerica-west1',
  memory: '128MiB',
  maxInstances: 1,
  timeoutSeconds: 15,
} as HttpsOptions;
