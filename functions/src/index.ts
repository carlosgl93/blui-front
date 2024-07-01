import { setGlobalOptions } from 'firebase-functions/v2/options';
import { userPaidAppointment } from './userPaidAppointment';
import { sendEmail } from './sendEmail';
import * as cors from 'cors';

setGlobalOptions({ region: 'southamerica-west1' });
cors({ origin: true });

export { userPaidAppointment, sendEmail };
