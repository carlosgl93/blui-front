import { useEffect, useRef, useState } from 'react';
import { sendMessage } from '@/api/chat/sendMessage';
import useAuth from '@/store/auth';
import { getMessages } from '@/api/chat/getMessages';
import { useMutation, useQuery, useQueryClient } from 'react-query';

type useChatMessagesProps = {
  userId: number;
  prestadorId: string | undefined;
};

export const usePrestadorChatMessages = ({ userId, prestadorId }: useChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [{ user }] = useAuth();
  const queryClient = useQueryClient();

  const sentBy = location.pathname.includes('prestador-chat') ? 'prestador' : 'user';

  const {
    data: messages,
    isError,
    isLoading,
    error,
  } = useQuery(
    ['messages', userId, prestadorId],
    () => getMessages(userId, prestadorId ?? '', user?.token as string),
    {
      enabled: !!userId && !!prestadorId,
    },
  );

  const mutation = useMutation(sendMessage, {
    onSuccess: () => {
      // On success, invalidate and refetch the messages query
      queryClient.invalidateQueries(['messages', userId, prestadorId]);
    },
  });

  const handleSendMessage = async () => {
    mutation.mutate(
      {
        message,
        prestadorId: '',
        userId,
        sentBy,
        token: user?.token as string,
      },
      {
        onSuccess: () => {
          setMessage('');
        },
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const scrollToElement = () => {
    const { current } = lastMessageRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendWithEnter = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleSendMessage();
    } else {
      return;
    }
  };
  useEffect(() => {
    scrollToElement();
  }, [messages]);

  return {
    messages,
    message,
    isError,
    isLoading,
    error,
    handleSendMessage,
    handleInputChange,
    isSending: mutation.isLoading,
    sendError: mutation.error,
    lastMessageRef,
    sendWithEnter,
    sentBy,
  };
};
