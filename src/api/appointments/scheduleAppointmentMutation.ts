import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';
import { User } from '@/store/auth/user';
import { Prestador } from '@/types';
import { db } from 'firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export interface ScheduleServiceParams {
  provider: Prestador;
  servicio: UserCreatedServicio;
  customer: User;
  scheduledDate: string;
  scheduledTime: string;
  isPaid?: boolean;
}

export async function scheduleService({
  provider,
  servicio,
  customer,
  scheduledDate,
  scheduledTime,
}: ScheduleServiceParams) {
  const newAppointment = {
    provider,
    servicio,
    customer,
    scheduledDate,
    scheduledTime,
    isPaid: false,
  };

  await setDoc(
    doc(db, 'appointments', `${provider.id}_${servicio.id}_${customer.id}_${scheduledTime}`),
    newAppointment,
  );

  return newAppointment;
}
