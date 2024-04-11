import { useAuthNew } from './useAuthNew';
import { collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';
import { availabilityState } from '@/store/construirPerfil/availability';
import { db } from 'firebase/firebase';
import { prestadorState } from '@/store/auth/prestador';
import { useEffect, useState } from 'react';

const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
const sortAvailability = (data: AvailabilityData[]) =>
  [...data].sort((a, b) => {
    return daysOfWeek.indexOf(a.day.toLowerCase()) - daysOfWeek.indexOf(b.day.toLowerCase());
  });

async function fetchAvailability(prestadorId: string) {
  const availabilityRef = collection(db, 'providers', prestadorId, 'availability');
  const fetch = query(availabilityRef);
  const snapshot = await getDocs(fetch);
  return snapshot.docs.map((doc) => doc.data()) as AvailabilityData[];
}

const updateDisponibilidad = async (id: string) => {
  const providerRef = doc(db, 'providers', id);

  await updateDoc(providerRef, {
    'settings.disponibilidad': true,
  });
};

export const useDisponibilidadNew = () => {
  const navigate = useNavigate();
  const [, setNotification] = useRecoilState(notificationState);
  const [availability, setAvailability] = useRecoilState(availabilityState);
  const [, setPrestadorState] = useRecoilState(prestadorState);
  const [editDisponibilidad, setEditDisponibilidad] = useState(false);
  const { prestador } = useAuthNew();
  const id = prestador?.id ?? '';
  const client = useQueryClient();

  const { error, isLoading, isError } = useQuery(
    ['availability', id],
    () => {
      if (!id) return;
      return fetchAvailability(id);
    },
    {
      enabled: !!id,
      onSuccess: (data) => {
        if (data) {
          const sortedAvailability = sortAvailability(data);
          setAvailability(sortedAvailability);
        }
      },
      onError: (error) => {
        setNotification({
          open: true,
          message:
            'Error al cargar disponibilidad, comprueba tu conexión a internet y recarga la página.',
          severity: 'error',
        });
        console.log('error', error);
      },
    },
  );

  const handleToggleDisponibilidadDay = (day: string) => {
    const newAvailability = availability.map((d) => {
      if (d.day === day) {
        return { ...d, isAvailable: !d.isAvailable };
      }
      return d;
    });
    setAvailability(newAvailability);
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    startOrEnd: 'startTime' | 'endTime',
  ) => {
    const { value: newTime } = e.target;

    setAvailability((prev) => {
      const newDisponibilidad = prev.map((day) => {
        if (`${startOrEnd}${day.day}` !== e.target.name) {
          return day;
        }

        const updatedDay = {
          ...day,
          times: {
            ...day.times,
            [startOrEnd]: newTime,
          },
        };

        return updatedDay;
      });

      return newDisponibilidad;
    });
  };

  const { mutate: handleSaveDisponibilidad, isLoading: saveDisponibilidadLoading } = useMutation(
    () => {
      updateDisponibilidad(id);
      return Promise.all(
        availability.map((a) => setDoc(doc(db, 'providers', id, 'availability', a.day), a)),
      );
    },
    {
      onSuccess: async () => {
        await client.invalidateQueries(['availability', 'prestador']);
        setPrestadorState((prev) => {
          if (!prev) return null;
          return { ...prev, settings: { ...prev.settings, disponibilidad: true } };
        });
        setEditDisponibilidad((prev) => !prev);
        setNotification({
          open: true,
          message: 'Disponibilidad guardada exitosamente',
          severity: 'success',
        });
      },
      onError: (error) => {
        console.error('Error saving availability:', error);
        setNotification({
          open: true,
          message: 'Error al guardar disponibilidad, intentalo de nuevo',
          severity: 'error',
        });
      },
    },
  );

  const handleEditDisponibilidad = () => {
    setEditDisponibilidad((prev) => !prev);
  };

  useEffect(() => {
    if (!id) {
      navigate('/ingresar');
    }
  }, []);

  return {
    availability,
    error,
    isLoading,
    isError,
    editDisponibilidad,
    saveDisponibilidadLoading,
    setEditDisponibilidad,
    handleToggleDisponibilidadDay,
    handleTimeChange,
    handleSaveDisponibilidad,
    handleEditDisponibilidad,
  };
};
