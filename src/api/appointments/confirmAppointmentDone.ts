/**;
 *
 * @param appointmentId: string
 * @returns  Returns
 *
 */

import { db } from '@/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

export async function confirmAppointmentDone(appointmentId: string) {
  const appointmentRefDoc = doc(db, 'appointments', appointmentId);
  const paymentsCollectionRef = collection(db, 'payments');
  const paymentQuery = query(paymentsCollectionRef, where('appointmentId', '==', appointmentId));

  try {
    await updateDoc(appointmentRefDoc, {
      confirmedByUser: true,
      status: 'Realizada',
    });
    const payment = (await getDocs(paymentQuery)).docs[0];
    console.log('payment found', payment);
    await updateDoc(doc(db, 'payments', payment.id), {
      paymentStatus: 'Ready to pay',
      confirmedByUser: true,
      status: 'Realizada',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
