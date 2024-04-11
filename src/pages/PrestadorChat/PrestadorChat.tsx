import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Mensaje } from '@/types/Mensaje';
import {
  ChatContainer,
  StyledChatInput,
  StyledChatInputContainer,
  StyledChatSendButton,
  StyledCustomerName,
  StyledMensajeTimestamp,
  StyledPrestadorMensajeContainer,
  StyledPrestadorMensajeText,
  StyledTimestampContainer,
  StyledUsuarioMensajeContainer,
  StyledUsuarioMensajeText,
} from './StyledPrestadorChatMensajes';

import { Prestador } from '@/types/Prestador';

import { usePrestadorChatMessages } from './usePrestadorChatMessages';
import Loading from '@/components/Loading';
import { formatDate } from '@/utils/formatDate';
import { Box } from '@mui/material';
import { useRetrieveCustomerAndPrestador } from '@/hooks/useRetrieveCustomerAndPrestador';

export type LocationState = {
  messages: Mensaje[];
  prestador: Prestador;
  sentBy: string;
};

export const PrestadorChat = () => {
  const { customer, prestador, isLoading, error } = useRetrieveCustomerAndPrestador();

  const customerId = customer?.id;
  const prestadorId = prestador?.id;

  const { messages, message, lastMessageRef, handleInputChange, handleSendMessage, sendWithEnter } =
    usePrestadorChatMessages({
      userId: customerId,
      prestadorId,
    });

  return (
    <ChatContainer>
      {isLoading && <Loading />}
      {error && <p>Hubo un error</p>}
      {messages &&
        messages.map((m: Mensaje, index: number) => {
          const isLastMessage = index === messages?.length - 1;
          if (m.sent_by === 'prestador') {
            return (
              <Box key={m.id}>
                <StyledPrestadorMensajeContainer
                  key={m.id}
                  ref={isLastMessage ? lastMessageRef : null}
                >
                  <StyledPrestadorMensajeText>{m.message}</StyledPrestadorMensajeText>
                  <StyledTimestampContainer>
                    <StyledMensajeTimestamp>{formatDate(m.created_at)}</StyledMensajeTimestamp>
                  </StyledTimestampContainer>
                </StyledPrestadorMensajeContainer>
              </Box>
            );
          } else {
            return (
              <Box key={m.id}>
                <StyledUsuarioMensajeContainer ref={isLastMessage ? lastMessageRef : null}>
                  <StyledCustomerName>{customer?.firstname}:</StyledCustomerName>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <StyledUsuarioMensajeText>{m.message}</StyledUsuarioMensajeText>
                    <StyledTimestampContainer>
                      <StyledMensajeTimestamp>{formatDate(m.created_at)}</StyledMensajeTimestamp>
                    </StyledTimestampContainer>
                  </Box>
                </StyledUsuarioMensajeContainer>
              </Box>
            );
          }
        })}
      <StyledChatInputContainer>
        <StyledChatInput
          value={message}
          placeholder="Escribe tu mensaje"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={sendWithEnter}
        />
        <StyledChatSendButton onClick={handleSendMessage} disabled={message.length === 0}>
          <SendOutlinedIcon />
        </StyledChatSendButton>
      </StyledChatInputContainer>
    </ChatContainer>
  );
};
