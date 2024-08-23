/**;
 *
 * @param appointmentId
 * @returns  Returns
 *
 */

import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function doneMutation(appointmentId: string) {
  const docRef = doc(db, 'appointments', appointmentId);
  try {
    await updateDoc(docRef, {
      status: 'Esperando confirmación del cliente',
    });
  } catch (error) {
    console.log('Error setting appointment as done', error);
    throw new Error('Hubo un error al actualizar la sesión');
  }
}
