import { AppointmentParams, confirmAppointmentDone, rateAppointment } from '@/api/appointments';
import { db } from '@/firebase';
import { notificationState } from '@/store/snackbar';
import dayjs from 'dayjs';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

export function UserAppointmentController(appointment: AppointmentParams) {
  const { provider, scheduledDate, scheduledTime } = appointment;
  const setNotification = useSetRecoilState(notificationState);

  const isPast = useMemo(() => {
    const dateTime = scheduledDate + ' ' + scheduledTime;
    const sesionDate = typeof dateTime === 'string' ? dateTime : undefined;
    return dayjs().isAfter(dayjs(sesionDate));
  }, [scheduledDate, scheduledTime]);

  const client = useQueryClient();

  const { mutate: confirmAppointmentDoneMutation, isLoading: confirmAppointmentDoneLoading } =
    useMutation(confirmAppointmentDone, {
      onSuccess() {
        setNotification({
          open: true,
          message: 'Sesión realizada, gracias por confirmar.',
          severity: 'success',
        });
        client.invalidateQueries(['userAppointments', appointment.customer.id]);
      },
      onError() {
        setNotification({
          open: true,
          message: 'Error al confirmar la sesión.',
          severity: 'error',
        });
      },
    });

  const { mutate: rateAppointmentMutation, isLoading: rateAppointmentLoading } = useMutation(
    rateAppointment,
    {
      onSuccess() {
        setNotification({
          open: true,
          message: 'Sesión calificada.',
          severity: 'success',
        });
      },
      onError() {
        setNotification({
          open: true,
          message: 'Error al calificar la sesión.',
          severity: 'error',
        });
      },
    },
  );

  const handleConfirmAppointmentDone = () => {
    // call api mutation for setting the status to "Realizada"
    if (appointment.id) {
      confirmAppointmentDoneMutation(appointment.id);
    }
  };

  const handleRateAppointment = (rating: number) => {
    if (appointment.id && provider.id) {
      rateAppointmentMutation({
        providerId: provider.id,
        appointmentId: appointment.id,
        rating,
        comment: '',
      });
    }
  };

  useEffect(() => {
    if (appointment.status === 'Agendada' && appointment.isPaid === false && appointment.id) {
      console.log('running delete appointment in case wrong schedule');
      const deleteAppointment = async () => {
        const docRef = doc(db, 'appointments', String(appointment.id));
        await deleteDoc(docRef);
      };
      deleteAppointment();
    }
  }, []);

  return {
    isPast,
    confirmAppointmentDoneLoading,
    rateAppointmentLoading,
    handleConfirmAppointmentDone,
    handleRateAppointment,
  };
}
