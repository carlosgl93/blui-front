import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import { useRetrieveCustomerAndPrestador } from '@/hooks/useRetrieveCustomerAndPrestador';
import BackButton from '@/components/BackButton';
import { Box, styled } from '@mui/material';
import { interactedPrestadorState } from '@/store/resultados/interactedPrestador';
import { useRecoilValue } from 'recoil';

const MobileHeaderContent = () => {
  const [, sidebarActions] = useSidebar();
  const { customer } = useRetrieveCustomerAndPrestador();
  const prestador = useRecoilValue(interactedPrestadorState);
  const isChat = location.pathname === '/chat' || location.pathname === '/prestador-chat';

  if (isChat) {
    return (
      <StyledChatHeaderContainer>
        <BackButton ignoreMargin />
        <ChatTitle>
          {location.pathname === '/chat'
            ? prestador?.firstname
              ? prestador?.firstname
              : prestador?.email
            : `${customer?.firstname && customer?.firstname} 
                ${customer?.lastname && customer?.lastname}`}
        </ChatTitle>
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
  gridTemplateColumns: '20% 80%',
  gridColumnGap: theme.spacing(4),
  height: theme.spacing(10),
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
}));
