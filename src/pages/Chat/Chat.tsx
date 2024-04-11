import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Mensaje } from '@/types/Mensaje';
import {
  ChatContainer,
  StyledChatInput,
  StyledChatInputContainer,
  StyledChatSendButton,
  StyledMensajeTimestamp,
  StyledPrestadorMensajeContainer,
  StyledPrestadorMensajeText,
  StyledPrestadorName,
  StyledTimestampContainer,
  StyledUsuarioMensajeContainer,
  StyledUsuarioMensajeText,
} from './StyledChatMensajes';

import { Prestador } from '@/types/Prestador';

import Loading from '@/components/Loading';
import { formatDate } from '@/utils/formatDate';
import { Box } from '@mui/material';
import { useRetrieveCustomerAndPrestador } from '@/hooks/useRetrieveCustomerAndPrestador';
import { usePrestadorChatMessages } from '../PrestadorChat/usePrestadorChatMessages';

export type LocationState = {
  messages: Mensaje[];
  prestador: Prestador;
  sentBy: string;
};

export const Chat = () => {
  const {
    customer,
    prestador,
    isLoading: customerPrestadorLoading,
  } = useRetrieveCustomerAndPrestador();

  const customerId = customer?.id;
  const prestadorId = prestador?.id;

  const {
    messages,
    message,
    isLoading,
    error,
    lastMessageRef,
    handleInputChange,
    handleSendMessage,
    sendWithEnter,
  } = usePrestadorChatMessages({
    userId: customerId,
    prestadorId,
  });

  if (isLoading) {
    return (
      <ChatContainer>
        <Loading />
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      {(isLoading || customerPrestadorLoading) && <Loading />}
      {error && <p>Hubo un error</p>}
      {messages &&
        messages.map((m: Mensaje, index: number) => {
          const isLastMessage = index === messages.length - 1;
          if (m.sent_by === 'prestador') {
            return (
              <StyledPrestadorMensajeContainer
                key={m.id}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <StyledPrestadorName>{prestador?.firstname}:</StyledPrestadorName>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <StyledPrestadorMensajeText>{m.message}</StyledPrestadorMensajeText>
                  <StyledTimestampContainer>
                    <StyledMensajeTimestamp>{formatDate(m.created_at)}</StyledMensajeTimestamp>
                  </StyledTimestampContainer>
                </Box>
              </StyledPrestadorMensajeContainer>
            );
          } else {
            return (
              <StyledUsuarioMensajeContainer key={m.id} ref={isLastMessage ? lastMessageRef : null}>
                <StyledUsuarioMensajeText>{m.message}</StyledUsuarioMensajeText>
                <StyledTimestampContainer>
                  <StyledMensajeTimestamp>{formatDate(m.created_at)}</StyledMensajeTimestamp>
                </StyledTimestampContainer>
              </StyledUsuarioMensajeContainer>
            );
          }
        })}
      <StyledChatInputContainer>
        <StyledChatInput
          value={message}
          placeholder="Escribe tu mensaje"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => sendWithEnter(e)}
        />
        <StyledChatSendButton onClick={handleSendMessage} disabled={message.length === 0}>
          <SendOutlinedIcon />
        </StyledChatSendButton>
      </StyledChatInputContainer>
    </ChatContainer>
  );
};
