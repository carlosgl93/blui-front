import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebase/firebase';

export const failedVerifyPrestadorMutation = async (prestadorId: string) => {
  const prestadorRef = doc(db, 'providers', prestadorId);
  await updateDoc(prestadorRef, { verified: 'Rechazado' });
};
