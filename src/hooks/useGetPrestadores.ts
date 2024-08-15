import { useQuery } from 'react-query';
import { getAllPrestadores, getPrestadores } from '@/api/prestadores';
import { Prestador } from '@/store/auth/prestador';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getTotalPrestadoresQuery } from '@/api/prestadores/getTotalPrestadores';

export const useGetPrestadores = () => {
  const [{ servicio, comuna, especialidad }] = useRecibeApoyo();

  const {
    data: allPrestadores = [],
    isLoading: allPrestadoresLoading,
    isError: allPrestadoresError,
  } = useQuery<Prestador[]>(['allPrestadores'], () => getAllPrestadores());

  console.log(comuna, servicio, especialidad);

  const {
    data: verifiedPrestadores = [],
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
    data: verifiedPrestadores,
    allPrestadores,
    allPrestadoresLoading,
    allPrestadoresError,
    totalPrestadores,
    isLoadingTotalPrestadores,
    isLoading,
    isError,
  };
};
