import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ScheduleServiceParams } from './scheduleAppointmentMutation';

export const getAppointmentByIdQuery = async (id: string) => {
  const appointmentRef = doc(db, 'appointments', id);
  const querySnapshot = await getDoc(appointmentRef);
  return querySnapshot.data() as ScheduleServiceParams[];
};
