import useAuth from '@/store/auth';
import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useChatMessages } from '../Chat/useChatMessages';
// import { sendMessage } from '@/api/chat/sendMessage';
// import useRecibeApoyo from '@/store/recibeApoyo';
// import { notificationState } from '@/store/snackbar';
import { Servicio, Especialidad } from '@/types/Servicio';
import { useState } from 'react';
// import { useRecoilState } from 'recoil';
import {
  DisponibilidadFromFront,
  // getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { TarifaFront } from '@/types';
// import { getPrestadorTarifas } from '@/api/tarifas';
import { Prestador } from '@/store/auth/prestador';

export const usePerfilPrestador = (prestador: Prestador) => {
  const { id } = useParams();
  const isTablet = useMediaQuery(tablet);
  const [{ user, isLoggedIn }, { updateRedirectToAfterLogin }] = useAuth();

  const { messages } = useChatMessages({
    userId: user?.id ?? '' ?? '',
    prestadorId: prestador.id,
  });

  // const [{ allServicios }] = useRecibeApoyo();
  // const [notification, setNotification] = useRecoilState(notificationState);
  const [prestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad] = useState({} as Especialidad);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [disponibilidad] = useState<DisponibilidadFromFront[]>([]);
  const [tarifas] = useState<TarifaFront[]>([]);

  const { offersFreeMeetAndGreet } = prestador;

  // const { service, speciality_id, offers_free_meet_greet } = prestador;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleContact = () => {
    if (isLoggedIn && user) {
      if (messages?.length > 0) {
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
    prestadorServicio,
    prestadorEspecialidad,
    open,
    message,
    disponibilidad,
    tarifas,
    freeMeetGreet: offersFreeMeetAndGreet,
    handleContact,
    handleOpen,
    handleClose,
    handleSendMessage,
    setMessage,
  };
};
