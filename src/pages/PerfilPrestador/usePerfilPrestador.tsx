import useAuth from '@/store/auth';
import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Prestador } from '@/store/auth/prestador';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { useAuthNew } from '@/hooks/useAuthNew';
import { useChat } from '@/hooks';

export const usePerfilPrestador = (prestador: Prestador) => {
  console.log(prestador);
  const isTablet = useMediaQuery(tablet);
  const prestadorId = prestador.id;
  const { user } = useAuthNew();
  const [, { updateRedirectToAfterLogin }] = useAuth();
  const { messages } = useChat(user?.id ?? '', prestador.id);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const setNotification = useSetRecoilState(notificationState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleContact = () => {
    if (user?.id.length) {
      if ((messages ?? []).length > 0) {
        navigate('/chat', {
          state: {
            prestador,
            messages,
            sentBy: user.role || 'user',
          },
        });
        return;
      }
      handleOpen();
      return;
    }

    updateRedirectToAfterLogin(`/perfil-prestador/${prestadorId}`);
    setNotification({
      open: true,
      message: 'Debes iniciar sesión para poder contactar a un prestador',
      severity: 'info',
    });
    navigate('/ingresar');
    return;
  };

  return {
    prestador,
    messages,
    isTablet,
    open,
    message,
    handleContact,
    handleOpen,
    handleClose,
    setMessage,
  };
};
