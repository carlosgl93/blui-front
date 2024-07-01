import { db } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ScheduleServiceParams } from './scheduleAppointmentMutation';
import { sortUserAppointments } from '@/utils/sortUserAppointments';

export const getUserAppointments = async (customerId: string) => {
  if (!customerId) {
    throw new Error('Customer ID is required');
  }

  const appointmentsRef = collection(db, 'appointments');
  const userAppointmentsQuery = query(appointmentsRef, where('customer.id', '==', customerId));
  const querySnapshot = await getDocs(userAppointmentsQuery);
  const userAppointments: ScheduleServiceParams[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ScheduleServiceParams[];
  return sortUserAppointments(userAppointments);
};
