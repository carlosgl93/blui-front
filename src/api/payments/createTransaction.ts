/**;
 *
 * @param appointment
 * @returns Url to send the user to the payment provider
 *
 */

import { ScheduleServiceParams } from '../appointments';
import paykuApi from '../paykuApi';
import { v4 as uuidv4 } from 'uuid';

export async function createTransaction(appointment: ScheduleServiceParams | undefined) {
  if (!appointment) {
    throw new Error('missing appointment details');
  }
  console.log('appointment', appointment);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return await paykuApi.post('/transaction', {
    email: appointment?.customer?.email,
    order: uuidv4(),
    subject: 'Initiating payment',
    amount: appointment?.servicio?.price ? +appointment?.servicio?.price * 1.05 : 999999999,
    currency: 'CLP',
    payment: 99,
    urlreturn: `${baseUrl}/successful-payment?appointmentId=${appointment?.id}`,
    // TODO: change for URL of the serverless function that is in charge of changing the appointment isPaid boolean to true
    urlnotify: `${baseUrl}/transactionResultNotify?appointmentId=${appointment?.id}`,
    additional_parameters: {
      username: appointment?.customer?.firstname,
      prestadorname: appointment?.provider.firstname,
    },
  });
}
