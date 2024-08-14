import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ScheduleServiceParams } from './scheduleAppointmentMutation';

export const getAppointmentByIdQuery = async (id: string | null) => {
  if (!id) {
    throw new Error('missing appointment id');
  }

  const appointmentRef = doc(db, 'appointments', id);
  const querySnapshot = await getDoc(appointmentRef);
  return querySnapshot.data() as ScheduleServiceParams;
};
