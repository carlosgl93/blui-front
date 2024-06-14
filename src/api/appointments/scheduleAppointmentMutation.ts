import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';
import { User } from '@/store/auth/user';
import { Prestador } from '@/types';
import { db } from 'firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

type ScheduleAppointmentProvider = Pick<Prestador, 'id' | 'firstname' | 'lastname' | 'email'>;
type ScheduleAppointmentCustomer = Pick<User, 'id' | 'firstname' | 'lastname' | 'email'>;

export interface ScheduleServiceParams {
  id?: string;
  provider: ScheduleAppointmentProvider;
  servicio: UserCreatedServicio;
  customer: ScheduleAppointmentCustomer;
  scheduledDate: string;
  scheduledTime: string;
  isPaid?: boolean | 'Confirmando' | 'Confirmada';
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
