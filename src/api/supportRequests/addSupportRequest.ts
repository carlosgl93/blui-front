import { db } from '@/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export const addSupportRequest = async (data: {
  title: string;
  userId: string;
  description: string;
  patientName: string;
  address: string;
}) => {
  try {
    await addDoc(collection(db, 'supportRequests'), {
      ...data,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};
