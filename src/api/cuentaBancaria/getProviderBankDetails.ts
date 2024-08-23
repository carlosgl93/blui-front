/**;
 *
 * @param providerId: string
 * @returns  Returns
 *
 */

import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getProviderBankDetails(providerId: string | undefined) {
  if (!providerId) {
    throw new Error('no provider id!');
  }

  const docRef = doc(db, 'bankAccounts', providerId);

  try {
    const details = await getDoc(docRef);
    return details.data();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
