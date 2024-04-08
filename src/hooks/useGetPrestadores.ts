import { Prestador } from '@/store/auth/prestador';
import useRecibeApoyo from '@/store/recibeApoyo';
import { db } from 'firebase/firebase';
import { collection, query, limit, where, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';

export const useGetPrestadores = () => {
  const [{ servicio, comuna, especialidad }] = useRecibeApoyo();

  const getPrestadoresByComunaAndServicio = async () => {
    const prestadorCollectionRef = collection(db, 'providers');
    let prestadoresQuery = query(prestadorCollectionRef, limit(15));

    if (comuna) {
      prestadoresQuery = query(prestadoresQuery, where('comunas', 'array-contains', comuna));
    }

    if (servicio) {
      prestadoresQuery = query(prestadoresQuery, where('servicio', '==', servicio.serviceName));
    }

    if (especialidad) {
      prestadoresQuery = query(
        prestadoresQuery,
        where('especialidad', '==', especialidad.especialidadName),
      );
    }

    const querySnapshot = await getDocs(prestadoresQuery);
    const prestadores = querySnapshot.docs.map((doc) => doc.data());

    // Fetch availability for each prestador
    for (const prestador of prestadores) {
      const availabilityRef = collection(db, 'providers', prestador.id, 'availability');
      const availabilitySnapshot = await getDocs(availabilityRef);
      const availability = availabilitySnapshot.docs.map((doc) => doc.data());

      // Add availability to prestador object
      prestador.availability = availability;
    }

    return prestadores as Prestador[];
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Prestador[]>(
    ['prestadoresByComunaAndServicio', comuna, servicio, especialidad],
    getPrestadoresByComunaAndServicio,
    {
      onError: (error) => {
        console.log('error', error);
      },
    },
  );

  return {
    data,
    isLoading,
    isError,
  };
};
