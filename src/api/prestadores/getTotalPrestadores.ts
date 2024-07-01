import { db } from '@/firebase/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

export const getTotalPrestadoresQuery = async () => {
  const prestadoresRef = collection(db, 'prestadores');
  const querySnapshot = await getCountFromServer(prestadoresRef);
  return querySnapshot.data();
};
