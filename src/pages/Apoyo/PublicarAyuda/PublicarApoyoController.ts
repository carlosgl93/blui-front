import { useAuthNew, useComunas } from '@/hooks';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { addSupportRequest } from '@/api/supportRequests';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { useServicios } from '@/hooks/useServicios';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { Recurrency } from '@/utils/getRecurrencyText';

export const PublicarApoyoController = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const { allServicios } = useServicios();
  const { selectedComunas } = useComunas();
  const { user, setUserState } = useAuthNew();
  const [description, setDescription] = useState('');
  const [recurrency, setRecurrency] = useState<Recurrency>('one-off');
  const [address, setAddress] = useState(user?.address || '');
  const [service, setService] = useState(user?.service || '');
  const setNotification = useSetRecoilState(notificationState);
  const [speciality, setSpeciality] = useState(user?.speciality || '');
  const [sessionsPerRecurrency, setSessionsPerRecurrency] = useState('1');
  const [patientName, setPatientName] = useState(user?.patientName || '');
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [totalHours, setTotalHours] = useState('1');
  const [startingDateAndTime, setStartingDateAndTime] = useState<Dayjs>();

  const {
    mutate: mutateAddSupportRequest,
    isLoading,
    isError,
  } = useMutation(addSupportRequest, {
    onSuccess: (data) => {
      setNotification({
        open: true,
        message: 'Publicación exitosa',
        severity: 'success',
      });
      navigate(`/ver-apoyo/${data}`, {
        replace: true,
        state: {
          apoyo: {
            title,
            userId: user?.id,
            description,
            patientName,
            address,
            comunasIds: selectedComunas.map((comuna) => comuna.id),
            recurrency,
            sessionsPerRecurrency,
            serviceName: service,
            specialityName: speciality,
            forWhom: user?.forWhom,
            patientAge: user?.patientAge,
          },
        },
      });
    },
    onError: (error) => {
      console.error('Error adding document: ', error);
      // Handle error (e.g., show an error message)
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      mutateAddSupportRequest({
        title,
        userId: user.id,
        description,
        patientName,
        address,
        comunasIds: selectedComunas.map((comuna) => comuna.id),
        recurrency,
        sessionsPerRecurrency,
        serviceName: service,
        specialityName: speciality,
        forWhom: user.forWhom,
        patientAge: user.patientAge!,
      });
    }
  };

  const handleSelectDate = useCallback(
    (e: Dayjs) => {
      if (recurrency !== 'one-off') {
        // CASE WHERE IS MULTIPLE DATES TO SELECT
        setSelectedDates((prev) => {
          if (prev.length >= Number(sessionsPerRecurrency)) {
            // CASE WHERE THE USER SELECTS MORE SESSIONS THAN THE SESSIONS PER RECURRENCY
            return [...prev.slice(1), e];
          } else if (prev?.some((date) => date.isSame(e))) {
            const newSelectedDates = prev
              .filter((date) => !date.isSame(e))
              .sort((a, b) => (a.isAfter(b) ? 1 : -1));
            return newSelectedDates;
          } else {
            return [...prev, e];
          }
        });
      } else {
        // CASE WHERE THE USER ONLY SELECTS ONE DATE
        setSelectedDates([e]);
      }
    },
    [recurrency, sessionsPerRecurrency],
  );

  return {
    user,
    title,
    setTitle,
    description,
    setDescription,
    patientName,
    setPatientName,
    address,
    setAddress,
    handleSubmit,
    isLoading,
    isError,
    service,
    setService,
    speciality,
    setSpeciality,
    setUserState,
    allServicios,
    recurrency,
    setRecurrency,
    sessionsPerRecurrency,
    setSessionsPerRecurrency,
    selectedDates,
    handleSelectDate,
    totalHours,
    setTotalHours,
    startingDateAndTime,
    setStartingDateAndTime,
  };
};
