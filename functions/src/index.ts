import { setGlobalOptions } from 'firebase-functions/v2/options';
import { userPaidAppointment } from './userPaidAppointment';
import { sendEmail } from './sendEmail';
import * as cors from 'cors';
cors({ origin: true });

setGlobalOptions({ region: 'southamerica-west1', timeoutSeconds: 15 });

export { userPaidAppointment, sendEmail };
