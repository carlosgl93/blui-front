/**;
 *
 * @param providerId: string
 * @param appointmentId: string
 * @param rating: number
 * @param comment?: string
 * @returns  void
 *
 */

import { db } from '@/firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

interface RateAppointment {
  providerId: string;
  appointmentId: string;
  rating: number;
  comment?: string;
}

export async function rateAppointment({
  appointmentId,
  providerId,
  rating,
  comment,
}: RateAppointment) {
  console.log('rating', appointmentId, providerId, rating);
  // Reference to the provider document
  const providerDocRef = doc(db, 'providers', providerId);
  // Reference to the reviews subcollection under the provider
  const reviewsCollectionRef = collection(providerDocRef, 'reviews');
  const appointmentDocRef = doc(db, 'appointments', appointmentId);

  try {
    // Add a new review document to the reviews subcollection
    await addDoc(reviewsCollectionRef, {
      appointmentId,
      rating,
      comment,
      createdAt: serverTimestamp(),
    });
    await updateDoc(appointmentDocRef, {
      rating,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
