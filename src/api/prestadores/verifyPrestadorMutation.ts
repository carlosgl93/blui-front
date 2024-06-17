import { db } from 'firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const verifyPrestadorMutation = async (prestadorId: string) => {
  const prestadorRef = doc(db, 'providers', prestadorId);
  await updateDoc(prestadorRef, { verified: 'Verificado' });
};
