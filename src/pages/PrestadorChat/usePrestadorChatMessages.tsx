import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMessages, sendMessage } from '@/api/firebase/chat';

type useChatMessagesProps = {
  userId: string;
  prestadorId: string;
};

export const usePrestadorChatMessages = ({ userId, prestadorId }: useChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const sentBy = location.pathname.includes('prestador-chat') ? 'provider' : 'user';

  const {
    data: messages,
    isError,
    isLoading,
    error,
  } = useQuery(
    ['messages', userId, prestadorId],
    () => getMessages({ userId, providerId: prestadorId }),
    {
      enabled: !!userId && !!prestadorId,
    },
  );

  const {
    mutate,
    isLoading: sendMessageIsLoading,
    error: sendMessageError,
  } = useMutation(sendMessage, {
    onSuccess: () => {
      // On success, invalidate and refetch the messages query
      queryClient.invalidateQueries(['messages', userId, prestadorId]);
    },
  });

  const handleSendMessage = async () => {
    mutate(
      {
        message,
        providerId: prestadorId,
        userId,
        sentBy,
      },
      {
        onSuccess: () => {
          // setMessage('');
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
    isSending: sendMessageIsLoading,
    sendError: sendMessageError,
    lastMessageRef,
    sendWithEnter,
    sentBy,
  };
};
