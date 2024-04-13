import { getMessages, sendMessage } from '@/api/firebase/chat';
import { notificationState } from '@/store/snackbar';
import { useMutation, useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

export const useChat = (userId: string, providerId: string) => {
  const setNotification = useSetRecoilState(notificationState);
  const { mutate: handleSaveMessage, isLoading: savingMessageLoading } = useMutation(sendMessage, {
    onSuccess() {
      setNotification({
        open: true,
        message: 'Mensaje enviado',
        severity: 'success',
      });
    },
  });

  const { data: messages, isLoading: messagesLoading } = useQuery(
    ['messages', userId, providerId],
    () => getMessages({ userId, providerId }),
    {
      enabled: !!userId && !!providerId,
      onError(err) {
        console.log('error getting messages', err);
      },
    },
  );

  return {
    messages,
    savingMessageLoading,
    messagesLoading,
    handleSaveMessage,
  };
};
