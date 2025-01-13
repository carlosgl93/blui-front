import { db } from '@/firebase';
import { Recurrency } from '@/utils/getRecurrencyText';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export type Apoyo = {
  id?: string;
  title: string;
  userId: string;
  serviceName: string;
  specialityName: string;
  description: string;
  forWhom: string;
  patientName: string;
  patientAge: number;
  address: string;
  comunasIds: number[];
  recurrency: Recurrency;
  sessionsPerRecurrency: string;
};

export const addSupportRequest = async (data: Apoyo) => {
  try {
    const newSupport = await addDoc(collection(db, 'supportRequests'), {
      ...data,
      timestamp: Timestamp.now(),
    });
    const id = newSupport.id;
    return {
      id,
      ...data,
    };
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};
