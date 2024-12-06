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
import { scheduleService, ScheduleAppointmentParams, Appointment } from '@/api/appointments';
import { notificationState } from '@/store/snackbar';
import { useState, useCallback, useEffect } from 'react';
import { Badge, SelectChangeEvent } from '@mui/material';
import { useAuthNew } from '@/hooks';
import dayjs, { Dayjs } from 'dayjs';
import { createTransaction } from '@/api/payments';
import { Prestador } from '@/store/auth/prestador';
import { useNavigate } from 'react-router-dom';

export const ScheduleController = () => {
  const { prestadorCreatedServicios: prestadorServicios, prestadorCreatedServiciosLoading } =
    useServicios();
  const prestador = useRecoilValue(interactedPrestadorState);
  const { handleCloseScheduleModal } = usePerfilPrestador(prestador as Prestador);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [waitingForPayku, setWaitingForPayku] = useState(false);
  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const setNotification = useSetRecoilState(notificationState);
  const [value, setValue] = useState<Dayjs | null>(null);
  const providerAvailability = prestador?.availability;
  const { providersAppointments, providersAppointmentsLoading } = useAppointments();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { user } = useAuthNew();
  const {
    selectedService,
    isMultiple,
    selectedDates,
    selectedTimes,
    howManySessionsToConfirm,
    howManySessionsToSchedule,
  } = schedule;
  const now = dayjs();

  useEffect(() => {
    const button = document.getElementById('agendar-button');
    if (button) {
      if (isButtonEnabled) {
        button.classList.add('enabled-animation');
        button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        button.classList.remove('enabled-animation');
      }
    }
  }, [isButtonEnabled]);

  useEffect(() => {
    const isEnabled =
      !!selectedService?.id &&
      !!selectedDates &&
      !!selectedTimes &&
      !scheduleServiceLoading &&
      !waitingForPayku &&
      howManySessionsToSchedule <= selectedDates.length &&
      howManySessionsToSchedule <= Object.keys(selectedTimes).length;

    setIsButtonEnabled(isEnabled);
  }, [selectedService, selectedDates, selectedTimes, waitingForPayku, howManySessionsToSchedule]);

  useEffect(() => {
    if (selectedDates?.length === howManySessionsToSchedule) {
      const timesToSchedule = document.getElementById('select-session-time');
      if (timesToSchedule) {
        timesToSchedule.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedDates, howManySessionsToSchedule]);

  const shouldDisableDay = (date: dayjs.Dayjs) => {
    // if (date.isBefore(now)) {
    //   return true;
    // }
    // Calculate the current time plus 24 hours to get the cutoff time
    const cutoffTime = now.add(24, 'hour');
    // Disable the date if it is less than 24 hours from the current time
    // Note: We use .startOf('day') to compare only the date part, ignoring the time
    if (date.diff(cutoffTime, 'days', true) < 0) {
      return true;
    }
    // Disable the date if the provider is not available on this day of the week
    const dayAvailability = providerAvailability?.find((d) => d?.id === date.get('day'));
    // If the day is not available, return true to disable it
    return !dayAvailability?.isAvailable;
  };
  const renderAvailableDay = (
    props: PickersDayProps<dayjs.Dayjs> & { selectedDays?: dayjs.Dayjs[] },
  ) => {
    // const renderedDayIsPast = props.day.isBefore(now);
    const { selectedDays = [], day, outsideCurrentMonth } = props;

    const isSelected =
      !outsideCurrentMonth && selectedDays?.some((selectedDay) => selectedDay.isSame(day, 'day'));

    // the day is available if the prestador availability includes that day of the week
    // and its not less than 24 hours from now
    // TODO: check if the day has all its time slots already appointed against providersAppointments
    const isAvailable = providerAvailability?.find((d) => {
      return d?.id === props.day.get('d');
    })?.isAvailable;
    //  && !renderedDayIsPast;

    if (isAvailable) {
      return (
        <Badge
          key={day.toString()}
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
            {...props}
            selected={isSelected}
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
  };

  const shouldDisableTime = useCallback(
    (time: Dayjs) => {
      const selectedDays = schedule.selectedDates;
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

        return selectedDays?.some((selectedDay) => {
          if (
            appointment.scheduledTime === completeTime &&
            appointment.scheduledDate === selectedDay?.format('YYYY-MM-DD')
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
          return (
            dayjs(appointment.scheduledDate).format('YYYY-MM-DD') ===
              selectedDay?.format('YYYY-MM-DD') &&
            !appointmentEndTime.isBefore(serviceStartTime) &&
            !appointmentStartTime.isAfter(serviceEndTime) &&
            !(time <= appointmentStartTime) &&
            !(time >= dayjs(appointmentEndTime))
          );
        });
      });

      if (isSomeTimeSlotBooked) {
        return true;
      }

      const isTimeUnavailable = selectedDays?.some((selectedDay) => {
        const dayAvailability = providerAvailability?.find((d) => d?.id === selectedDay?.day());
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
      });

      return isTimeUnavailable ? isTimeUnavailable : false;
    },
    [providerAvailability, providersAppointments, schedule.selectedDates, value],
  );
  const handleSelectServicio = (serviceId: string) => {
    const selectedService = prestadorServicios?.find((s) => s?.id === serviceId);
    setSchedule({
      ...schedule,
      selectedService,
    });
  };

  const handleCheckIsMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule((prev) => {
      if (e.target.value === 'false') {
        return {
          ...prev,
          isMultiple: false,
          howManySessionsToSchedule: 1,
          howManySessionsToConfirm: 1,
        };
      }
      return { ...prev, isMultiple: e.target.value === 'true' };
    });
  };

  const handleSelectHowManySessionsToSchedule = (e: SelectChangeEvent<string>) => {
    setSchedule((prev) => {
      return { ...prev, howManySessionsToSchedule: Number(e.target.value) };
    });
  };

  const handleSelectHowManySessionsToConfirm = (e: SelectChangeEvent<number>) => {
    setSchedule((prev) => {
      return { ...prev, howManySessionsToConfirm: Number(e.target.value) };
    });
  };

  const handleSelectDate = useCallback(
    (e: Dayjs) => {
      setSchedule((prev) => {
        if (schedule.isMultiple) {
          // case where the user selects a date that was already selected: removes selected
          if (prev.selectedDates?.some((date) => date.isSame(e))) {
            const newSelectedDates = prev.selectedDates
              .filter((date) => !date.isSame(e))
              .sort((a, b) => (a.isAfter(b) ? 1 : -1));
            const newSelectedTimes = { ...prev.selectedTimes };
            delete newSelectedTimes[e.format('YYYY-MM-DD') as unknown as number];
            return { ...prev, selectedDates: newSelectedDates, selectedTimes: newSelectedTimes };
          } else if (prev?.selectedDates?.length === howManySessionsToSchedule) {
            // case where the user selects a date and the limit of dates is reached: removes the first selected date and adds the new one
            const newSelectedTimes = { ...prev.selectedTimes };
            let newSelectedDates = [...prev.selectedDates];
            delete newSelectedTimes[newSelectedDates[0].format('YYYY-MM-DD') as unknown as number];
            newSelectedDates = [...prev.selectedDates.slice(1), e].sort((a, b) =>
              a.isAfter(b) ? 1 : -1,
            );
            // @ts-ignore
            return { ...prev, selectedDates: newSelectedDates, selectedTimes: newSelectedTimes };
          } else {
            const newSelectedDates = prev.selectedDates
              ? [...prev.selectedDates, e].sort((a, b) => (a.isAfter(b) ? 1 : -1))
              : [e];
            return { ...prev, selectedDates: newSelectedDates };
          }
        } else {
          return { ...prev, selectedDates: [e] };
        }
      });
    },
    [schedule.isMultiple, howManySessionsToSchedule],
  );

  const handleSelectSessionHour = useCallback(
    (date: Dayjs, time: Dayjs) => {
      setSchedule((prev) => {
        const newSelectedTimes = { ...prev.selectedTimes };
        const dateKey = date.format('YYYY-MM-DD');

        // Set the time for the given date
        // @ts-ignore
        newSelectedTimes[dateKey] = time;

        return { ...prev, selectedTimes: newSelectedTimes };
      });
    },
    [schedule.isMultiple, howManySessionsToSchedule, selectedDates],
  );

  const handleSubmit = () => {
    navigate('/booking-confirmation');
    return;
  };

  const handleConfirmBooking = () => {
    const scheduledTimes = selectedDates!.map((date) => ({
      date: date.format('YYYY-MM-DD'),
      time: selectedTimes![date.format('YYYY-MM-DD') as unknown as number].format('HH:mm'),
    }));

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

      scheduleServiceMutate(
        scheduledTimes.map(
          ({ date, time }) =>
            ({
              provider,
              servicio: selectedService!,
              customer,
              scheduledDate: date,
              scheduledTime: time,
              status: 'Pendiente de pago',
              rating: 0,
              confirmedByUser: false,
              isMultiple,
              howManySessionsToConfirm,
              totalPaidScheduling: Number(selectedService?.price) * (howManySessionsToConfirm || 1),
              providersAvailability: providerAvailability,
            } as ScheduleAppointmentParams),
        ),
      );
    }
  };

  const handleSendUserToPayku = async (paykuParams: {
    appointments: Appointment[];
    totalToPay: number;
    sessionsToConfirm: number;
  }) => {
    setWaitingForPayku(!waitingForPayku);
    const paykuRes = await createTransaction(paykuParams);
    if (paykuRes) {
      // await updateAppointment(appointment, paykuRes);
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
      onSuccess: async (data: Appointment[]) => {
        const paykuParams = {
          appointments: data,
          totalToPay: Number(schedule.selectedService!.price) * (howManySessionsToConfirm || 1),
          sessionsToConfirm: howManySessionsToConfirm,
        };
        setSchedule({
          selectedTimes: null,
          selectedDates: null,
          isMultiple: false,
          selectedService: undefined,
          howManySessionsToSchedule: 1,
          howManySessionsToConfirm: 1,
        });
        setValue(null);
        client.invalidateQueries(['userAppointments', user?.id]);
        client.invalidateQueries(['providerAppointments', prestador?.id]);
        handleSendUserToPayku(paykuParams);
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
  const selectedServiceDuration = selectedService?.duration;
  const availableTimesStep =
    selectedServiceDuration && selectedServiceDuration > 45 ? 60 : selectedServiceDuration;

  const numberOfSessionsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return {
    prestadorCreatedServicios: prestadorServicios,
    prestadorCreatedServiciosLoading,
    providersAppointmentsLoading,
    handleCloseScheduleModal,
    numberOfSessionsOptions,
    scheduleServiceLoading,
    providerAvailability,
    availableTimesStep,
    waitingForPayku,
    prestador,
    schedule,
    value,
    setValue,
    setSchedule,
    handleSubmit,
    shouldDisableDay,
    handleSelectDate,
    shouldDisableTime,
    renderAvailableDay,
    handleSelectServicio,
    handleConfirmBooking,
    handleCheckIsMultiple,
    handleSelectSessionHour,
    handleSelectHowManySessionsToConfirm,
    handleSelectHowManySessionsToSchedule,
  };
};
