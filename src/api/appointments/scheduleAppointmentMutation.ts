import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';
import { User } from '@/store/auth/user';
import { Prestador } from '@/types';
import dayjs from 'dayjs';
import { db } from '@/firebase/firebase';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export type ScheduleAppointmentProvider = Pick<
  Prestador,
  'id' | 'firstname' | 'lastname' | 'email'
>;
export type ScheduleAppointmentCustomer = Pick<User, 'id' | 'firstname' | 'lastname' | 'email'>;
export type TisPaid =
  | boolean
  | 'Confirmando'
  | 'Confirmada'
  | 'Transferencia no encontrada'
  | 'Pagado'
  | 'failed'
  | 'approved'
  | undefined;

export type TStatus =
  | 'Agendada'
  | 'Realizada'
  | 'Esperando confirmación del cliente'
  | 'Pendiente de pago'
  | 'Pagada';

export interface AppointmentParams {
  id?: string;
  provider: ScheduleAppointmentProvider;
  servicio: UserCreatedServicio;
  customer: ScheduleAppointmentCustomer;
  scheduledDate: string;
  scheduledTime: string;
  isPaid?: TisPaid;
  createdAt?: FieldValue | string | dayjs.Dayjs;
  status: TStatus;
  rating: number;
  confirmedByUser: boolean;
  paykuId?: string;
  paykuPaymentURL?: string;
}

export async function scheduleService({
  provider,
  servicio,
  customer,
  scheduledDate,
  scheduledTime,
}: AppointmentParams) {
  const newAppointment: AppointmentParams = {
    provider,
    servicio,
    customer,
    scheduledDate,
    scheduledTime,
    isPaid: false,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 'Pendiente de pago',
    rating: 0,
    confirmedByUser: false,
  };
  const docRef = await addDoc(collection(db, 'appointments'), newAppointment);
  newAppointment.id = docRef.id;
  return newAppointment;
}
