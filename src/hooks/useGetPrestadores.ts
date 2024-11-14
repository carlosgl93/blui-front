import { useInfiniteQuery, useQuery } from 'react-query';
import { getAllPrestadores, getPrestadores } from '@/api/prestadores';
import { Prestador } from '@/store/auth/prestador';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getTotalPrestadoresQuery } from '@/api/prestadores/getTotalPrestadores';
import { useEffect, useState } from 'react';
import { QueryDocumentSnapshot } from 'firebase/firestore';

export const useGetPrestadores = () => {
  const [{ servicio, comuna, especialidad }] = useRecibeApoyo();
  const [limit] = useState(10);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<Prestador> | null>(null);

  const {
    data: allPrestadores = [],
    isLoading: allPrestadoresLoading,
    isError: allPrestadoresError,
  } = useQuery<Prestador[]>(['allPrestadores'], () => getAllPrestadores());

  const {
    data: verifiedPrestadores,
    isLoading,
    isError,
  } = useQuery(
    ['prestadoresByComunaAndServicio', comuna, servicio, especialidad],
    () => getPrestadores(comuna, servicio, especialidad, lastDoc, limit),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onSuccess(data) {
        setLastDoc(data.lastDoc as QueryDocumentSnapshot<Prestador>);
      },
    },
  );

  const {
    data: infinitePrestadores,
    isLoading: infinitePrestadoresIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['verifiedProvidersInfinite', comuna, servicio, especialidad],
    ({ pageParam = null }) => getPrestadores(comuna, servicio, especialidad, pageParam, limit),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      getNextPageParam: (lastPage) => lastPage.lastDoc,
    },
  );

  const { data: totalPrestadores, isLoading: isLoadingTotalPrestadores } = useQuery(
    'totalPrestadores',
    getTotalPrestadoresQuery,
    {},
  );

  useEffect(() => {
    const sentinel = document.querySelector('.bottomSentinel');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (sentinel) {
      observer.observe(sentinel);
    }
  }, []);

  return {
    verifiedPrestadores: verifiedPrestadores,
    infinitePrestadores: infinitePrestadores?.pages,
    infinitePrestadoresIsLoading,
    allPrestadores,
    allPrestadoresLoading,
    allPrestadoresError,
    totalPrestadores,
    isLoadingTotalPrestadores,
    isLoading,
    isError,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
