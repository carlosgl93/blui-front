import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import BackButton from '@/components/BackButton';
import { Box, styled } from '@mui/material';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { useRecoilValue } from 'recoil';
import { chatState } from '@/store/chat/chatStore';

const MobileHeaderContent = () => {
  const [, sidebarActions] = useSidebar();
  const location = useLocation();
  const prestador = useRecoilValue(interactedPrestadorState);
  const chats = useRecoilValue(chatState);
  const username = chats?.username;
  const prestadorName = chats?.providerName;
  const isUserChat = location.pathname === '/chat';
  const isProviderChat = location.pathname === '/prestador-chat';

  if (isUserChat) {
    return (
      <StyledChatHeaderContainer>
        <BackButton ignoreMargin displayText={false} />
        <ChatTitle>
          {prestadorName
            ? prestadorName
            : prestador?.firstname
            ? prestador?.firstname
            : prestador?.email}
        </ChatTitle>
      </StyledChatHeaderContainer>
    );
  }

  if (isProviderChat) {
    return (
      <StyledChatHeaderContainer>
        <BackButton ignoreMargin displayText={false} />
        <ChatTitle>{username}</ChatTitle>
      </StyledChatHeaderContainer>
    );
  }

  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <IconButton
        onClick={sidebarActions.toggle}
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderIconImage src={`/images/blui-new.png`} alt="Blui logo" />
      </Link>
    </FlexBox>
  );
};

export default MobileHeaderContent;

const StyledChatHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '20% 75%',
  gridColumnGap: theme.spacing(4),
  height: theme.spacing(10),
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
}));
