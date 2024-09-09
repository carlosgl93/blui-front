import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import MobileHeaderContent from './MobileHeaderContent';
import DesktopHeaderContent from './DesktopHeaderContent';
import { useLocation } from 'react-router-dom';

function Header() {
  const isTablet = useMediaQuery(tablet);
  const location = useLocation();

  const isChat =
    isTablet && (location.pathname === '/chat' || location.pathname === '/prestador-chat');
  return (
    <Box>
      <AppBar
        color="transparent"
        elevation={1}
        sx={{
          borderBottom: '1px solid #e0e0e0',
          zIndex: 1000,
          backgroundColor: 'white',
          position: isChat ? 'fixed' : 'static',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isTablet ? <MobileHeaderContent /> : <DesktopHeaderContent />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
