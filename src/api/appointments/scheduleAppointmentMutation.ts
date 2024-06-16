import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';
import { User } from '@/store/auth/user';
import { Prestador } from '@/types';
import dayjs from 'dayjs';
import { db } from 'firebase/firebase';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

type ScheduleAppointmentProvider = Pick<Prestador, 'id' | 'firstname' | 'lastname' | 'email'>;
type ScheduleAppointmentCustomer = Pick<User, 'id' | 'firstname' | 'lastname' | 'email'>;

export interface ScheduleServiceParams {
  id?: string;
  provider: ScheduleAppointmentProvider;
  servicio: UserCreatedServicio;
  customer: ScheduleAppointmentCustomer;
  scheduledDate: string;
  scheduledTime: string;
  isPaid?: boolean | 'Confirmando' | 'Confirmada' | 'Transferencia no encontrada';
  createdAt?: FieldValue | string | dayjs.Dayjs;
}

export async function scheduleService({
  provider,
  servicio,
  customer,
  scheduledDate,
  scheduledTime,
}: ScheduleServiceParams) {
  const newAppointment: ScheduleServiceParams = {
    provider,
    servicio,
    customer,
    scheduledDate,
    scheduledTime,
    isPaid: false,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  const docRef = await addDoc(collection(db, 'appointments'), newAppointment);
  newAppointment.id = docRef.id;

  return newAppointment;
}
