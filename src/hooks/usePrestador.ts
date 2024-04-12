import { Prestador } from '@/store/auth/prestador';
import { notificationState } from '@/store/snackbar';
import { db } from 'firebase/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';

const dayOrder = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

const sortedAvailability = (availability: AvailabilityData[]) =>
  availability.sort((a, b) => {
    console.log(a, b);
    return dayOrder.indexOf(a.day.toLowerCase()) - dayOrder.indexOf(b.day.toLowerCase());
  });

const getPrestadorByIdFirestore = async (id: string): Promise<Prestador> => {
  const providersRef = doc(db, 'providers', id);
  const res = await getDoc(providersRef);

  const prestador = res.data() as Prestador;

  const availabilityRef = collection(providersRef, 'availability');
  const availabilitySnapshot = await getDocs(availabilityRef);
  const availability = availabilitySnapshot.docs.map((doc) => doc.data()) as AvailabilityData[];
  prestador.availability = sortedAvailability(availability);
  return prestador;
};

export const usePrestador = (prestadorId: string) => {
  const setNotification = useSetRecoilState(notificationState);

  const {
    data: prestador,
    isError,
    isLoading,
    error,
  } = useQuery(['prestador', prestadorId], () => getPrestadorByIdFirestore(prestadorId), {
    enabled: !!prestadorId,
    onError: (error) => {
      console.error(error);
      setNotification({
        open: true,
        message: 'Ocurrió un error al cargar el perfil del prestador',
        severity: 'error',
      });
    },
  });

  return {
    prestador,
    isError,
    isLoading,
    error,
  };
};
