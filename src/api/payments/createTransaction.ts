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
  const baseUrl: string = import.meta.env.VITE_BASE_URL;
  const notifyUrl = import.meta.env.VITE_PAYMENT_NOTIFY_URL;
  const orderId = uuidv4();

  const paykuRes = await paykuApi.post('/transaction', {
    email: appointment?.customer?.email,
    order: orderId,
    subject: `Pago por servicio de ${appointment?.servicio?.name} al prestador ${appointment.provider.firstname} ${appointment.provider.lastname}`,
    amount: appointment?.servicio?.price ? +appointment?.servicio?.price * 1.05 : 999999999,
    currency: 'CLP',
    payment: 99,
    urlreturn: `${baseUrl}/payment?appointmentId=${appointment?.id}`,
    // TODO: change for URL of the serverless function that is in charge of changing the appointment isPaid boolean to true
    urlnotify: `${notifyUrl}?appointmentId=${appointment?.id}`,
    additional_parameters: {
      id: appointment?.id,
      username: appointment?.customer?.firstname,
      prestadorname: appointment?.provider.firstname,
    },
  });

  console.log(paykuRes.data);

  return paykuRes.data;
}
