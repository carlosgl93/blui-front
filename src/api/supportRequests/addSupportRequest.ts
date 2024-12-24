import { db } from '@/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export const addSupportRequest = async (data: {
  userId: string;
  description: string;
  patientName: string;
  address: string;
}) => {
  await addDoc(collection(db, 'supportRequests'), {
    ...data,
    timestamp: Timestamp.now(),
  });
};
