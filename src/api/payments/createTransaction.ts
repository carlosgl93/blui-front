/**;
 *
 * @param appointment Object containing the service, provider, customer, scheduledDate and scheduledTime
 * @returns Url to send the user to the payment provider
 *
 */

import { paymentSettings } from '@/config';
import { ScheduleServiceParams } from '../appointments';
import paykuApi from '../paykuApi';
import { v4 as uuidv4 } from 'uuid';

export async function createTransaction(appointment: ScheduleServiceParams | undefined) {
  if (!appointment) {
    throw new Error('Missing appointment details / no appointment object passed');
  }

  if (!appointment?.servicio?.price) {
    throw new Error('Service is missing its price');
  }

  const baseUrl: string = import.meta.env.VITE_BASE_URL;
  const notifyUrl: string = import.meta.env.VITE_PAYMENT_NOTIFY_URL;
  const orderId = uuidv4();

  try {
    const paykuRes = await paykuApi.post('/transaction', {
      email: appointment?.customer?.email,
      order: orderId,
      subject: `Pago por servicio de ${appointment?.servicio?.name} al prestador ${appointment.provider.firstname} ${appointment.provider.lastname}`,
      amount: +appointment?.servicio?.price * paymentSettings.appCommission,
      currency: paymentSettings.currency,
      payment: paymentSettings.paymentMethods,
      urlreturn: `${baseUrl}/payment?appointmentId=${appointment?.id}`,
      urlnotify: `${String(notifyUrl)}?appointmentId=${appointment?.id}`,
      additional_parameters: {
        id: appointment?.id,
      },
    });

    return paykuRes.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction');
  }
}
