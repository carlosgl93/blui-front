/**;
 *
 * @param appId firestore appointmentId
 * @param transactionId payku transaction id
 * @returns  void
 *
 */

import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { AppointmentParams } from './scheduleAppointmentMutation';
import { CreatedTransaction } from '../payments/payku/models';

export async function updateAppointment(
  appointment: AppointmentParams,
  createdTransaction: CreatedTransaction,
): Promise<void> {
  const { id, url } = createdTransaction;
  const appointmentDocRef = doc(db, 'appointments', appointment!.id!);

  await updateDoc(appointmentDocRef, {
    paykuId: id,
    paykuPaymentURL: url,
    ...appointment,
  });
}