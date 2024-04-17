import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Conversation, getProviderInboxMessages } from '@/api/firebase/chat';
import { useAuthNew } from '@/hooks/useAuthNew';
import { useSetRecoilState } from 'recoil';
import { chatState } from '@/store/chat/chatStore';

export const usePrestadorInbox = () => {
  const { prestador } = useAuthNew();
  const setMessages = useSetRecoilState(chatState);
  const providerId = prestador?.id;
  const navigate = useNavigate();
  const location = useLocation();

  const router = useNavigate();

  const handleClickChat = (chat: Conversation) => {
    setMessages(chat);
    router('/prestador-chat');
  };

  const { data: fetchProvidersChat, isLoading: isLoadingProvidersChats } = useQuery(
    ['providerMessages', providerId],
    () => getProviderInboxMessages({ providerId: providerId ?? '' }),
  );

  useEffect(() => {
    if (location.pathname === '/prestador-inbox' && !providerId?.length) {
      navigate('/ingresar');
    }
  }, []);

  return {
    handleClickChat,
    fetchProvidersChat,
    isLoadingProvidersChats,
  };
};
