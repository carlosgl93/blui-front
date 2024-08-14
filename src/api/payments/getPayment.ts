/**;
 *
 * @param  appointmentId: appointment document id
 * @returns  Returns the status of the appointment payment
 *
 */

import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getPayment(appointmentId: string | null) {
  if (!appointmentId) {
    throw new Error('missing appointment details');
  }

  const paymentRef = doc(db, 'appointments', appointmentId);
  const data = await getDoc(paymentRef);
  return data;
}
