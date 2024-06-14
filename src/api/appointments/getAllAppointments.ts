import { db } from 'firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ScheduleServiceParams } from './scheduleAppointmentMutation';

export const getAllAppointments = async () => {
  const appointmentsRef = collection(db, 'appointments');
  const querySnapshot = await getDocs(appointmentsRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ScheduleServiceParams[];
};
