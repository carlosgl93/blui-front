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
  StyledProviderName,
  StyledTimestampContainer,
  StyledUsuarioMensajeContainer,
  StyledUsuarioMensajeText,
} from './StyledPrestadorChatMensajes';

import { Prestador } from '@/types/Prestador';

import { usePrestadorChatMessages } from './usePrestadorChatMessages';
import Loading from '@/components/Loading';
import { formatDate } from '@/utils/formatDate';
import { Box } from '@mui/material';
import { chatState } from '@/store/chat/chatStore';
import { useRecoilValue } from 'recoil';
import { useChat } from '@/hooks';

export type LocationState = {
  messages: Mensaje[];
  prestador: Prestador;
  sentBy: string;
};

export const PrestadorChat = () => {
  const conversation = useRecoilValue(chatState);
  const customerId = conversation.userId;
  const prestadorId = conversation.providerId;
  const { handleSaveMessage, messagesLoading, sendWithEnter, message, setMessage } = useChat(
    customerId,
    prestadorId,
  );

  const { lastMessageRef } = usePrestadorChatMessages({
    userId: customerId,
    prestadorId,
  });

  return (
    <ChatContainer>
      {messagesLoading && <Loading />}
      {conversation.messages.map((m, index: number) => {
        const isLastMessage = index === conversation.messages?.length - 1;
        if (m.sentBy === 'provider') {
          return (
            <Box key={m.id}>
              <StyledPrestadorMensajeContainer
                key={m.id}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <StyledProviderName>
                  {conversation.providerName.includes('@') ? 'Tú' : conversation.providerName}:
                </StyledProviderName>
                <StyledPrestadorMensajeText>{m.message}</StyledPrestadorMensajeText>
                <StyledTimestampContainer>
                  <StyledMensajeTimestamp>{formatDate(m.timestamp)}</StyledMensajeTimestamp>
                </StyledTimestampContainer>
              </StyledPrestadorMensajeContainer>
            </Box>
          );
        } else {
          return (
            <Box key={m.id}>
              <StyledUsuarioMensajeContainer ref={isLastMessage ? lastMessageRef : null}>
                <StyledCustomerName>{conversation.username}:</StyledCustomerName>
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
                    <StyledMensajeTimestamp>{formatDate(m.timestamp)}</StyledMensajeTimestamp>
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
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            sendWithEnter(e, {
              message,
              sentBy: 'provider',
              providerId: prestadorId,
              userId: customerId,
            })
          }
        />
        <StyledChatSendButton
          onClick={() =>
            handleSaveMessage({
              message,
              sentBy: 'provider',
              providerId: prestadorId,
              userId: customerId,
            })
          }
          disabled={message.length === 0}
        >
          <SendOutlinedIcon />
        </StyledChatSendButton>
      </StyledChatInputContainer>
    </ChatContainer>
  );
};
