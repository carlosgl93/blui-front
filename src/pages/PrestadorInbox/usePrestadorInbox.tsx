import { useEffect, useState } from 'react';
import useAuth from '@/store/auth';
import { getPrestadorInboxMessages } from '@/api/chat/getPrestadorInboxMessages';
import { useNavigate } from 'react-router-dom';

// type Chat = {
//   createdAt: string;
//   id: string;
//   message: string;
//   prestadorId: string;
//   sentBy: string;
//   userId: string;
//   firstname: string;
// };

export const usePrestadorInbox = () => {
  const [{ user }] = useAuth();
  const [prestadorInbox, setPrestadorInbox] = useState<
    | {
        id: string;
        createdAt: string;
        sentBy: string;
        userId: number;
        prestadorId: number;
        message: string;
        firstname: string;
      }[]
    | undefined
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleClickChat = (prestadorId: string, userId: string) => {
    router('/prestador-chat', {
      state: {
        prestadorId,
        userId,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    getPrestadorInboxMessages(user?.id ?? '').then((res) => {
      setPrestadorInbox(
        res?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      );
    });
    setLoading(false);
  }, [user]);

  return {
    loading,
    prestadorInbox,
    handleClickChat,
  };
};
