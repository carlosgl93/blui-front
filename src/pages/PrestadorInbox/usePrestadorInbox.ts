import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProviderInboxMessages } from '@/api/firebase/chat';
import { useAuthNew } from '@/hooks/useAuthNew';

export const usePrestadorInbox = () => {
  const { prestador } = useAuthNew();
  const providerId = prestador?.id;
  const navigate = useNavigate();

  const router = useNavigate();

  const handleClickChat = (prestadorId: string, userId: string) => {
    router('/prestador-chat', {
      state: {
        prestadorId,
        userId,
      },
    });
  };

  const { data: fetchProvidersChat, isLoading: isLoadingProvidersChats } = useQuery(
    ['providerMessages', providerId],
    () => getProviderInboxMessages({ providerId: providerId ?? '' }),
    {},
  );

  useEffect(() => {
    if (!providerId) navigate('/ingresar');
  }, []);

  return {
    handleClickChat,
    fetchProvidersChat,
    isLoadingProvidersChats,
  };
};
