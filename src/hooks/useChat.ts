import {
  Conversation,
  getMessages,
  sendFirstMessage,
  sendMessage,
  SendMessageArgs,
} from '@/api/firebase/chat';
import { chatState } from '@/store/chat/chatStore';
import { notificationState } from '@/store/snackbar';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const useChat = (userId: string, providerId: string) => {
  const [messages, setMessages] = useRecoilState(chatState);
  const [message, setMessage] = useState('');
  const setNotification = useSetRecoilState(notificationState);
  const navigate = useNavigate();

  const client = useQueryClient();

  const { mutate: handleSaveMessage, isLoading: savingMessageLoading } = useMutation(sendMessage, {
    onSuccess: async () => {
      // setMessages((prev) => [...prev, data.message] as Message[]);
      await client.invalidateQueries(['messages', userId, providerId]);
    },
    onError: (error, variables, context: Conversation | undefined) => {
      // context is the snapshot value returned from onMutate
      console.log('on error running');
      console.log({ error });
      console.log({ variables });
      console.log({ context });
      if (context) {
        setMessages(context);
      }
    },
    onMutate: async (newMessage) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await client.cancelQueries(['messages', userId, providerId]);

      // Snapshot the previous value
      const prevMessages = messages;
      setMessage('');
      // Optimistically update to the new value
      setMessages((old) => {
        newMessage.timestamp = new Date().toISOString();
        return {
          ...old,
          messages: [...old.messages, newMessage],
        } as Conversation;
      });

      // Return a context object with the snapshotted value
      return prevMessages;
    },
  });

  const { mutate: handleSendFirstMessage, isLoading: sendFirstMessageLoading } = useMutation(
    sendFirstMessage,
    {
      onSuccess: async () => {
        await client.invalidateQueries(['messages', userId, providerId]);

        navigate('/chat', {
          state: {
            prestador: {
              id: providerId,
            },
          },
        });
        setNotification({
          open: true,
          message: 'Mensaje enviado',
          severity: 'success',
        });
      },
    },
  );

  const { data: fetchMessages, isLoading: messagesLoading } = useQuery(
    ['messages', userId, providerId],
    () => getMessages({ userId, providerId }),
    {
      enabled: !!userId && !!providerId,
      onSuccess(data) {
        setMessages(data);
      },
      onError(err) {
        console.log('error getting messages', err);
      },
    },
  );

  const sendWithEnter = (e: React.KeyboardEvent, args: SendMessageArgs) => {
    if (e.code === 'Enter') {
      handleSaveMessage(args);
    } else {
      return;
    }
  };

  return {
    fetchMessages,
    message,
    messages,
    savingMessageLoading,
    sendFirstMessageLoading,
    messagesLoading,
    setMessage,
    handleSendFirstMessage,
    sendWithEnter,
    handleSaveMessage,
  };
};
