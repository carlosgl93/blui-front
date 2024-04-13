import useAuth from '@/store/auth';
import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Prestador } from '@/store/auth/prestador';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { useAuthNew } from '@/hooks/useAuthNew';
import { useChat } from '@/hooks';

export const usePerfilPrestador = (prestador: Prestador) => {
  const { id } = useParams();
  const isTablet = useMediaQuery(tablet);
  const { user } = useAuthNew();
  const [, { updateRedirectToAfterLogin }] = useAuth();

  const { messages } = useChat(user?.id ?? '', id ?? '');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const setNotification = useSetRecoilState(notificationState);

  const { offersFreeMeetAndGreet } = prestador;

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
      // navigate(`/chat/${id}`);
      handleOpen();
      return;
    }

    updateRedirectToAfterLogin(`/perfil-prestador/${id}`);
    setNotification({
      open: true,
      message: 'Debes iniciar sesión para poder contactar a un prestador',
      severity: 'info',
    });
    navigate('/ingresar');
    return;
  };

  const handleSendMessage = async () => {
    // todo handle messages
    // const res = await sendMessage({
    //   message,
    //   prestadorId: prestador.id,
    //   userId: user!.id as number,
    //   token: user!.token as string,
    //   sentBy: user?.role || 'user',
    // });
    // if (res.status === 'success') {
    //   setNotification({
    //     ...notification,
    //     open: true,
    //     message: 'Mensaje enviado con exito',
    //     severity: res.status,
    //   });
    //   // handleClose();
    //   navigate('/chat', {
    //     state: {
    //       prestador,
    //       messages: [
    //         ...messages,
    //         {
    //           created_at: new Date().toISOString(),
    //           id: Math.floor(Math.random() * 10000),
    //           message,
    //           prestador_id: prestador.id,
    //           sent_by: user?.role || 'user',
    //           usuario_id: user?.id ?? '',
    //         },
    //       ],
    //     },
    //   });
    //   return;
    // } else {
    //   setNotification({
    //     ...notification,
    //     open: true,
    //     message: 'Hubo un error, por favor intentalo mas tarde',
    //     severity: res.status,
    //   });
    //   handleClose();
    //   return;
    // }
  };

  // useEffect(() => {
  //   const thisPrestadorServicio = allServicios?.find((s) => s.id === service_id);
  //   if (thisPrestadorServicio) {
  //     setPrestadorServicio(thisPrestadorServicio);
  //   }

  //   const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
  //     (e) => e.id === speciality_id,
  //   ) as Especialidad;

  //   if (thisPrestadorEspecialidad) {
  //     setPrestadorEspecialidad(thisPrestadorEspecialidad);
  //   }
  // }, [allServicios, service_id, speciality_id]);

  // useEffect(() => {
  //   getDisponibilidadByPrestadorId(prestador.id as number).then((res) => {
  //     setDisponibilidad(res as DisponibilidadFromFront[]);
  //   });
  // }, []);

  // useEffect(() => {
  //   getPrestadorTarifas(prestador.id as number).then((res) => {
  //     setTarifas(res as TarifaFront[]);
  //   });
  // }, []);

  return {
    prestador,
    messages,
    isTablet,
    open,
    message,
    freeMeetGreet: offersFreeMeetAndGreet,
    handleContact,
    handleOpen,
    handleClose,
    handleSendMessage,
    setMessage,
  };
};
