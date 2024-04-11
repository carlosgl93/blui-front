import { getPrestadorById } from '@/api/prestadores/getPrestadorById';
import { useQuery } from 'react-query';

export const usePrestador = (prestadorId: string) => {
  const {
    data: prestador,
    isError,
    isLoading,
    error,
  } = useQuery(['prestador', prestadorId], () => getPrestadorById(prestadorId), {
    enabled: !!prestadorId,
  });

  return {
    prestador,
    isError,
    isLoading,
    error,
  };
};
