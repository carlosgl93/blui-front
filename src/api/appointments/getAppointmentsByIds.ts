import { db } from '@/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Appointment } from './scheduleAppointmentMutation';

/**
 * Fetches an appointment by its ID from the Firestore database.
 * @param id The unique identifier of the appointment to fetch.
 * @returns A promise that resolves to the appointment data as ScheduleServiceParams.
 * @throws Error if the appointment ID is missing or if fetching the appointment fails.
 */

export const getAppointmentsByIdsQuery = async (ids: string[]): Promise<Appointment[]> => {
  if (!ids || ids.length === 0) {
    throw new Error('missing appointments ids');
  }
  try {
    const appointmentRef = collection(db, 'appointments');
    const q = query(appointmentRef, where('id', 'in', ids));
    const appsSnapshot = await getDocs(q);
    if (!appsSnapshot.empty) {
      throw new Error(`No appointments found for IDs: ${JSON.stringify(ids)}`);
    }
    const data: Appointment[] = appsSnapshot.docs.map((doc) => doc.data() as Appointment);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch appointment: ${error instanceof Error ? error.message : error}`,
    );
  }
};
