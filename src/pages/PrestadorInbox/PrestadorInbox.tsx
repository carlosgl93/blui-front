import { Box, List, ListItem, styled } from '@mui/material';
import { Text } from '@/components/StyledComponents';
import { StyledAvatar } from '../PerfilPrestador/MobilePerfilPrestadorStyledComponents';
import { StyledTitle, Wrapper } from '../PrestadorDashboard/StyledPrestadorDashboardComponents';
import { formatDate } from '@/utils/formatDate';
import Loading from '@/components/Loading';
import { Message } from '@/api/firebase/chat';
import { usePrestadorInbox } from './usePrestadorInbox';

const TitleContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  borderRadius: '0.5rem',
  backgroundColor: theme.palette.background.paper,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatAvatar = styled(StyledAvatar)(() => ({
  width: '64px',
  height: '64px',
  marginRight: '1rem',
  marginTop: 0,
  marginBottom: 0,
}));

const StyledChatDate = styled(Text)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

export const PrestadorInbox = () => {
  const { handleClickChat, fetchProvidersChat, isLoadingProvidersChats } = usePrestadorInbox();

  return (
    <Wrapper>
      <TitleContainer>
        <StyledTitle>Inbox</StyledTitle>
      </TitleContainer>
      {isLoadingProvidersChats && <Loading />}
      {fetchProvidersChat?.length === 0 && <p>No hay mensajes</p>}
      {fetchProvidersChat && fetchProvidersChat?.length > 0 && (
        <StyledList>
          {fetchProvidersChat?.map((chat: Message) => {
            const { id, providerId, userId } = chat;

            return (
              <StyledListItem key={id} onClick={() => handleClickChat(providerId, userId)}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChatAvatar />
                  <Text>{userId}</Text>
                </Box>
                <Box>
                  <StyledChatDate>{formatDate(new Date())}</StyledChatDate>
                </Box>
              </StyledListItem>
            );
          })}
        </StyledList>
      )}
    </Wrapper>
  );
};
