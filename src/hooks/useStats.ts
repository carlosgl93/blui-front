import { getPrestadoresCount, getUsersCount } from '@/api/stats';
import { useQuery } from 'react-query';

export const useStats = () => {
  const {
    data: usersCount,
    isLoading: usersCountLoading,
    error: usersCountError,
  } = useQuery<number, Error>('usersCount', getUsersCount, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: prestadoresCount,
    isLoading: prestadoresCountLoading,
    error: prestadoresCountError,
  } = useQuery<number, Error>('prestadoresCount', getPrestadoresCount, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    usersCount,
    prestadoresCount,
    usersCountLoading,
    prestadoresCountLoading,
    usersCountError,
    prestadoresCountError,
  };
};
