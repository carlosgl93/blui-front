import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { usePerfilPrestador } from '@/pages/PerfilPrestador/usePerfilPrestador';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PickersDayProps, PickersDay } from '@mui/x-date-pickers';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ScheduleState } from '@/store/schedule/sheduleState';
import { useServicios } from '@/hooks/useServicios';
import { useMutation, useQueryClient } from 'react-query';
import { useAppointments } from '@/hooks/useAppointments';
import { scheduleService, ScheduleServiceParams } from '@/api/appointments';
import { notificationState } from '@/store/snackbar';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { Badge } from '@mui/material';
import { useAuthNew } from '@/hooks';
import dayjs, { Dayjs } from 'dayjs';
import { Prestador } from '@/types';
import { userAppointmentsState } from '@/store/appointments';
import { sortUserAppointments } from '@/utils/sortUserAppointments';

export const ScheduleController = () => {
  const prestador = useRecoilValue(interactedPrestadorState);
  const { handleCloseScheduleModal } = usePerfilPrestador(prestador as Prestador);
  const setUserAppointments = useSetRecoilState(userAppointmentsState);
  const { prestadorCreatedServicios: prestadorServicios } = useServicios();
  const [schedule, setSchedule] = useRecoilState(ScheduleState);
  const setNotification = useSetRecoilState(notificationState);
  const [value, setValue] = useState<Dayjs | null>(null);
  const providerAvailability = prestador?.availability;
  const { providersAppointments } = useAppointments();
  const client = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthNew();

  const renderAvailableDay = useCallback(
    (props: PickersDayProps<dayjs.Dayjs>) => {
      const isAvailable = providerAvailability?.find((d) => {
        return d.id === props.day.get('d');
      })?.isAvailable;

      if (isAvailable) {
        return (
          <Badge
            key={props.day.toString()}
            overlap="circular"
            sx={{
              borderRadius: '50%',
              color: 'green',
            }}
            badgeContent={
              <CheckOutlinedIcon
                sx={{
                  width: '0.7rem',
                }}
                htmlColor="green"
              />
            }
          >
            <PickersDay
              lang="es"
              {...props}
              color={isAvailable ? 'green' : 'black'}
              sx={{
                color: 'black',
              }}
            />
          </Badge>
        );
      }

      return (
        <Badge
          key={props.day.toString()}
          overlap="circular"
          sx={{
            borderRadius: '50%',
            color: isAvailable ? 'green' : 'black',
          }}
          badgeContent={
            isAvailable ? null : (
              <DoNotDisturbAltOutlinedIcon
                sx={{
                  width: '0.7rem',
                }}
                htmlColor="red"
              />
            )
          }
        >
          <PickersDay
            {...props}
            color={isAvailable ? 'green' : 'red'}
            sx={{
              color: 'red',
            }}
          />
        </Badge>
      );
    },
    [providerAvailability],
  );

  const shouldDisableTime = useCallback(
    (time: Dayjs) => {
      // add validation that disables the iterated time if the
      const selectedDay = value?.day();
      const completeTime = time.format('HH:mm');
      const timeHour = time.get('hours');
      const timeMinutes = time.get('minutes');
      // Check if the selected time slot is already booked
      const isTimeSlotBooked = providersAppointments?.some((appointment) => {
        if (
          appointment.scheduledTime === completeTime &&
          appointment.scheduledDate === schedule?.selectedDate?.format('YYYY-MM-DD')
        ) {
          console.log('time slot booked');
          return true;
        }
      });

      if (isTimeSlotBooked) {
        return true;
      }

      const dayAvailability = providerAvailability?.find((d) => d.id === selectedDay);
      if (dayAvailability && dayAvailability.isAvailable) {
        // validation when provider is available all day
        if (
          dayAvailability.times.startTime === '00:00' &&
          (dayAvailability.times.endTime === '23:59' || dayAvailability.times.endTime === '0:0')
        ) {
          return false;
        }
        const startTimeSplit = dayAvailability.times.startTime.split(':');
        const endTimeSplit = dayAvailability.times.endTime.split(':');

        const startHour = startTimeSplit[0];
        const endHour = endTimeSplit[0];
        const startMinutes = startTimeSplit[1];
        const endMinutes = endTimeSplit[1];

        if (
          Number(startHour) > timeHour ||
          Number(endHour) < timeHour ||
          (Number(endHour) === timeHour && Number(endMinutes) <= timeMinutes) ||
          (Number(startHour) === timeHour && Number(startMinutes) > timeMinutes)
        ) {
          return true;
        }
        (Number(startHour) === timeHour || Number(endHour) === timeHour) &&
          (Number(endMinutes) < timeMinutes || Number(startMinutes) > timeMinutes);
      }
      return false;
    },
    [
      providerAvailability,
      value,
      providersAppointments,
      schedule.selectedDate,
      schedule.selectedTime,
    ],
  );

  const handleSelectServicio = (serviceId: string) => {
    const selectedService = prestadorServicios?.find((s) => s.id === serviceId);
    setSchedule({
      ...schedule,
      selectedService,
    });
  };

  const handleSubmit = () => {
    const scheduledTime = schedule?.selectedTime!.format('HH:mm');
    const scheduledDate = schedule?.selectedDate!.format('YYYY-MM-DD');
    if (prestador && user && schedule.selectedService) {
      scheduleServiceMutate({
        provider: prestador as Prestador,
        servicio: schedule.selectedService!,
        customer: user,
        scheduledDate,
        scheduledTime,
      });
    }
  };

  const { mutate: scheduleServiceMutate, isLoading: scheduleServiceLoading } = useMutation(
    scheduleService,
    {
      onSettled: async () => {
        console.log(client);
        client.invalidateQueries(['userAppointments', user?.id]);
        client.invalidateQueries(['providerAppointments', prestador?.id]);

        console.log('success');
        console.log(user?.id);
      },
      onSuccess: (data) => {
        console.log('data on success userAppointnemts', data);
        setNotification({
          open: true,
          message: 'Servicio agendado correctamente',
          severity: 'success',
        });
        setUserAppointments((prev) =>
          sortUserAppointments([...prev, data as ScheduleServiceParams]),
        );
        client.invalidateQueries(['userAppointments', user?.id]);
        client.invalidateQueries(['providerAppointments', prestador?.id]);
        handleCloseScheduleModal();
        navigate('/sesiones');
      },
    },
  );

  return {
    providerAvailability,
    prestadorCreatedServicios: prestadorServicios,
    value,
    schedule,
    scheduleServiceLoading,
    renderAvailableDay,
    shouldDisableTime,
    setSchedule,
    setValue,
    handleCloseScheduleModal,
    handleSelectServicio,
    handleSubmit,
  };
};
