import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { usePerfilPrestador } from '@/pages/PerfilPrestador/usePerfilPrestador';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PickersDayProps, PickersDay } from '@mui/x-date-pickers';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { scheduleState } from '@/store/schedule/sheduleState';
import { useServicios } from '@/hooks/useServicios';
import { useMutation, useQueryClient } from 'react-query';
import { useAppointments } from '@/hooks/useAppointments';
import { scheduleService, AppointmentParams } from '@/api/appointments';
import { notificationState } from '@/store/snackbar';
import { useState, useCallback } from 'react';
import { Badge } from '@mui/material';
import { useAuthNew } from '@/hooks';
import dayjs, { Dayjs } from 'dayjs';
import { createTransaction } from '@/api/payments';
import { Prestador } from '@/store/auth/prestador';
import { updateAppointment } from '@/api/appointments/updateAppointment';

export const ScheduleController = () => {
  const [waitingForPayku, setWaitingForPayku] = useState(false);
  const prestador = useRecoilValue(interactedPrestadorState);
  const { handleCloseScheduleModal } = usePerfilPrestador(prestador as Prestador);
  const { prestadorCreatedServicios: prestadorServicios, prestadorCreatedServiciosLoading } =
    useServicios();
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const setNotification = useSetRecoilState(notificationState);
  const [value, setValue] = useState<Dayjs | null>(null);
  const providerAvailability = prestador?.availability;
  const { providersAppointments } = useAppointments();
  const client = useQueryClient();
  const { user } = useAuthNew();
  const now = dayjs();

  const shouldDisableDay = (date: dayjs.Dayjs) => {
    // if (date.isBefore(now)) {
    //   return true;
    // }
    // Calculate the current time plus 24 hours to get the cutoff time
    const cutoffTime = now.add(24, 'hour');
    // Disable the date if it is less than 24 hours from the current time
    // Note: We use .startOf('day') to compare only the date part, ignoring the time
    // todo uncomment these lines to production
    if (date.diff(cutoffTime, 'days', true) < 0) {
      return true;
    }
    // Disable the date if the provider is not available on this day of the week
    const dayAvailability = providerAvailability?.find((d) => d?.id === date.get('day'));
    // If the day is not available, return true to disable it
    return !dayAvailability?.isAvailable;
  };
  const renderAvailableDay = useCallback(
    (props: PickersDayProps<dayjs.Dayjs>) => {
      // const renderedDayIsPast = props.day.isBefore(now);

      // the day is available if the prestador availability includes that day of the week
      // and its not less than 24 hours from now
      const isAvailable = providerAvailability?.find((d) => {
        return d?.id === props.day.get('d');
      })?.isAvailable;
      //  && !renderedDayIsPast;

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
      const isSomeTimeSlotBooked = providersAppointments?.some((appointment) => {
        const serviceDuration = schedule.selectedService!.duration;
        const appointmentStartTime = dayjs(appointment.scheduledTime, 'HH:mm');
        const appointmentEndTime = appointmentStartTime.add(serviceDuration, 'minutes');
        const serviceStartTime = dayjs(completeTime, 'HH:mm');
        const serviceEndTime = serviceStartTime.add(serviceDuration, 'minutes');

        if (
          appointment.scheduledTime === completeTime &&
          appointment.scheduledDate === schedule?.selectedDate?.format('YYYY-MM-DD')
        ) {
          return true;
        }

        // This conditional checks if the current time slot should be disabled based on the following criteria:
        // 1. The appointment date matches the selected schedule date.
        // 2. The appointment does not end before the service start time.
        // 3. The appointment does not start after the service end time.
        // 4. The current time is not before the appointment start time.
        // 5. The current time is not after the appointment end time.
        // This ensures that time slots overlapping with or within the duration of an existing appointment are disabled.
        if (
          dayjs(appointment.scheduledDate).format('YYYY-MM-DD') ===
            schedule?.selectedDate?.format('YYYY-MM-DD') &&
          !appointmentEndTime.isBefore(serviceStartTime) &&
          !appointmentStartTime.isAfter(serviceEndTime) &&
          !(time <= appointmentStartTime) &&
          !(time >= dayjs(appointmentEndTime))
        ) {
          return true;
        }
      });

      if (isSomeTimeSlotBooked) {
        return true;
      }

      const dayAvailability = providerAvailability?.find((d) => d?.id === selectedDay);
      if (dayAvailability && dayAvailability?.isAvailable) {
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
    [providerAvailability, providersAppointments, schedule.selectedDate],
  );

  const handleSelectServicio = (serviceId: string) => {
    const selectedService = prestadorServicios?.find((s) => s?.id === serviceId);
    setSchedule({
      ...schedule,
      selectedService,
    });
  };

  const handleSelectDate = (e: Dayjs) => {
    setSchedule((prev) => {
      return { ...prev, selectedDate: e! };
    });
    setValue(e);
  };

  const handleSubmit = () => {
    const scheduledTime = schedule?.selectedTime!.format('HH:mm');
    const scheduledDate = schedule?.selectedDate!.format('YYYY-MM-DD');
    if (prestador && user && schedule.selectedService) {
      const provider = {
        id: prestador.id,
        firstname: prestador.firstname,
        lastname: prestador.lastname,
        email: prestador.email,
      };
      const customer = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      scheduleServiceMutate({
        provider,
        servicio: schedule.selectedService!,
        customer,
        scheduledDate,
        scheduledTime,
        status: 'Agendada',
        rating: 0,
        confirmedByUser: false,
      });
    }
  };

  const handleSendUserToPayku = async (appointment: AppointmentParams) => {
    setWaitingForPayku(!waitingForPayku);
    const paykuRes = await createTransaction(appointment);
    if (paykuRes && appointment.id) {
      await updateAppointment(appointment, paykuRes);
      window.location.href = paykuRes.url;
    } else {
      throw new Error('Error al crear la transacción');
    }
    setWaitingForPayku(!waitingForPayku);
  };

  const { mutate: scheduleServiceMutate, isLoading: scheduleServiceLoading } = useMutation(
    scheduleService,
    {
      onSettled: async () => {
        client.invalidateQueries(['userAppointments', user?.id]);
        client.invalidateQueries(['providerAppointments', prestador?.id]);
      },
      onSuccess: async (data: AppointmentParams) => {
        setSchedule({
          selectedTime: null,
          selectedDate: null,
        });
        setValue(null);
        client.invalidateQueries(['userAppointments', user?.id]);
        client.invalidateQueries(['providerAppointments', prestador?.id]);
        handleSendUserToPayku(data);
      },
      onError: async () => {
        setNotification({
          open: true,
          message: 'Error al agendar el servicio',
          severity: 'error',
        });
      },
    },
  );
  const { selectedService } = schedule;
  const selectedServiceDuration = selectedService?.duration;
  const availableTimesStep =
    selectedServiceDuration && selectedServiceDuration > 45 ? 60 : selectedServiceDuration;

  return {
    prestadorCreatedServiciosLoading,
    providerAvailability,
    prestadorCreatedServicios: prestadorServicios,
    value,
    schedule,
    availableTimesStep,
    scheduleServiceLoading,
    waitingForPayku,
    renderAvailableDay,
    shouldDisableTime,
    setSchedule,
    setValue,
    handleCloseScheduleModal,
    handleSelectServicio,
    handleSubmit,
    shouldDisableDay,
    handleSelectDate,
  };
};
