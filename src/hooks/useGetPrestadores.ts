import { useQuery } from 'react-query';
import { getPrestadores } from '@/api/prestadores';
import { Prestador } from '@/store/auth/prestador';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getTotalPrestadoresQuery } from '@/api/prestadores/getTotalPrestadores';

export const useGetPrestadores = () => {
  const [{ servicio, comuna, especialidad }] = useRecibeApoyo();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Prestador[]>(
    ['prestadoresByComunaAndServicio', comuna, servicio, especialidad],
    () => getPrestadores(comuna, servicio, especialidad),
  );

  const { data: totalPrestadores, isLoading: isLoadingTotalPrestadores } = useQuery(
    'totalPrestadores',
    getTotalPrestadoresQuery,
  );

  return {
    data,
    totalPrestadores,
    isLoadingTotalPrestadores,
    isLoading,
    isError,
  };
};
