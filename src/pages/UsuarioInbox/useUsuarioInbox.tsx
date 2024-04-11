import { useEffect, useState } from 'react';
import useAuth from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import { getUsuarioInboxMessages } from '@/api/chat/getUsuarioInboxMessages';

// type Chat = {
//   createdAt: string;
//   id: string;
//   message: string;
//   prestadorId: string;
//   sentBy: string;
//   userId: string;
//   firstname: string;
//   lastname: string;
// };

export const useUsuarioInbox = () => {
  const [{ user }] = useAuth();
  const [usuarioInbox, setUsuarioInbox] = useState<
    | {
        id: string;
        createdAt: string;
        sentBy: string;
        userId: string;
        prestadorId: string;
        message: string;
        firstname: string;
      }[]
    | undefined
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleClickChat = (prestadorId: string, userId: string) => {
    const prestador = usuarioInbox?.find((chat) => chat.prestadorId === prestadorId);
    router('/chat', {
      state: {
        prestadorId,
        userId,
        prestadorName: prestador?.firstname,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    getUsuarioInboxMessages(user?.id ?? '').then((res) => {
      const formattedRes = res?.map((item) => ({
        ...item,
        id: String(item.id), // convert id to string
        userId: String(item.userId), // convert userId to string
        prestadorId: String(item.prestadorId), // convert prestadorId to string
      }));
      setUsuarioInbox(
        formattedRes?.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    });
    setLoading(false);
  }, [user]);

  return {
    loading,
    usuarioInbox,
    handleClickChat,
  };
};
