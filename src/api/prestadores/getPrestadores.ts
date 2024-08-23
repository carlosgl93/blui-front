import { Prestador } from '@/store/auth/prestador';
import { Comuna } from '@/types';
import { Especialidad, Servicio } from '@/types/Servicio';
import { db } from '@/firebase/firebase';
import { collection, query, limit, where, getDocs } from 'firebase/firestore';

export const getPrestadores = async (
  comuna: Comuna | null,
  servicio: Servicio | null,
  especialidad: Especialidad | null,
) => {
  const prestadorCollectionRef = collection(db, 'providers');
  let prestadoresQuery = query(prestadorCollectionRef, where('verified', '!=', false), limit(15));

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
  return prestadores as Prestador[];
};
