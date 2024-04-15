import React from 'react';
import { Title } from '../StyledComponents';
import {
  StyledTextArea,
  StyledMessageOption,
  StyledModalCTAsContainer,
  StyledCerrarButton,
  StyledEnviarButton,
} from './ChatModalStyledComponents';
import { useChat } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useAuthNew } from '@/hooks/useAuthNew';
import Loading from '../Loading';
import { Box } from '@mui/material';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { useRecoilValue } from 'recoil';

type EnviarMensajeProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
};

const commonMessages = [
  'Hola, me gustaría saber si estás disponible esta semana.',
  '¿Haces algun descuento por numero de horas?',
  '¿Me puedes contar mas sobre tu experiencia?',
];

export const EnviarMensaje = ({ message, setMessage, handleClose }: EnviarMensajeProps) => {
  const handleClickPredefinedMessage = (message: string) => {
    setMessage(message);
  };
  const prestadorState = useRecoilValue(interactedPrestadorState);
  const prestador = prestadorState ? prestadorState : { firstname: '', email: '' };
  const { id } = useParams();
  const { user } = useAuthNew();

  const { handleSendFirstMessage, sendFirstMessageLoading } = useChat(user?.id ?? '', id ?? '');

  return (
    <Box
      sx={{
        width: {
          xs: '90vw',
          sm: '80vw',
          md: '50vw',
        },
      }}
    >
      {sendFirstMessageLoading ? (
        <Loading />
      ) : (
        <>
          <Title sx={{ fontSize: '2rem', textAlign: 'center', mb: '1rem' }}>Enviar mensaje</Title>
          <StyledTextArea
            minRows={3}
            cols={45}
            placeholder="Escribe tu mensaje aqui o elige una de estas opciones:"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {commonMessages.map((m, index) => (
            <StyledMessageOption
              variant="outlined"
              key={index}
              id={m}
              onClick={() => handleClickPredefinedMessage(m)}
            >
              {m}
            </StyledMessageOption>
          ))}
          <StyledModalCTAsContainer>
            <StyledCerrarButton variant="contained" onClick={handleClose}>
              Cerrar
            </StyledCerrarButton>
            <StyledEnviarButton
              variant="contained"
              color="primary"
              onClick={() =>
                handleSendFirstMessage({
                  message,
                  sentBy: 'user',
                  providerId: id ?? '',
                  userId: user?.id ?? '',
                  username: user?.firstname ?? '',
                  providerName: prestador?.firstname?.length
                    ? prestador.firstname
                    : prestador.email,
                })
              }
              disabled={message.length < 5}
            >
              Enviar
            </StyledEnviarButton>
          </StyledModalCTAsContainer>
        </>
      )}
    </Box>
  );
};
