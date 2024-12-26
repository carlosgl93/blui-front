import { useInfiniteQuery, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useAuthNew } from './useAuthNew';
import { getTotalClientesQuery } from '@/api';
import { getClientes } from '@/api/clientes/getClientes';
import { User } from '@/store/auth/user';

export type UserPages =
  | (
      | {
          clientes: User[];
          lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData>;
        }
      | {
          clientes: never[];
          lastDoc: null;
        }
    )[]
  | undefined;

export const useGetClientes = () => {
  const { prestador } = useAuthNew();
  const [limit] = useState(10);
  // const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<Prestador> | null>(null);

  const { servicio, comunas, especialidad } = prestador!;

  const {
    data: infiniteClientes,
    isLoading: infiniteClientesIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['getClientes', comunas, servicio, especialidad],
    ({ pageParam = null }) => getClientes(comunas, servicio, especialidad, pageParam, limit),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      getNextPageParam: (lastPage) => lastPage.lastDoc,
      onSuccess(data) {
        console.log(data);
      },
    },
  );

  const { data: totalClientes, isLoading: isLoadingtotalClientes } = useQuery(
    'totalClientes',
    getTotalClientesQuery,
    {},
  );

  useEffect(() => {
    const sentinel = document.querySelector('.bottomSentinel');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        console.log('fetching new page');
        fetchNextPage();
      }
    });
    if (sentinel) {
      observer.observe(sentinel);
    }
  }, []);

  return {
    infiniteClientes: infiniteClientes?.pages,
    infiniteClientesIsLoading,
    totalClientes,
    isLoadingtotalClientes,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
