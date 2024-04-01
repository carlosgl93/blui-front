import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { generalOptionsDrawerList, usuarioDrawerOptions } from './usuarioDrawerOptions';
import { ChevronRightOutlined } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { useAuthNew } from '@/hooks/useAuthNew';
import { User, userState } from '@/store/auth/user';

type UsuarioDrawerListProps = {
  closeDrawer: () => void;
};

export const UsuarioDrawerList = ({ closeDrawer }: UsuarioDrawerListProps) => {
  const { logout } = useAuthNew();

  const user = useRecoilValue(userState);

  const { firstname, lastname } = user as User;

  return (
    <List
      component={'nav'}
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <ListItem
        sx={{
          ml: '0.5rem',
        }}
      >
        <Avatar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: '1rem',
          }}
        >
          <ListItemText>{firstname + ' ' + lastname}</ListItemText>
        </Box>
      </ListItem>
      <ListItem>
        <ListItemButton onClick={() => logout()}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Salir
        </ListItemButton>
      </ListItem>

      <Divider />
      {usuarioDrawerOptions.map(({ path, title, icon: Icon }) => (
        <ListItem sx={{ p: '0 auto' }} key={path}>
          <ListItemButton
            component={Link}
            to={path as string}
            onClick={closeDrawer}
            sx={{ py: '0' }}
          >
            {Icon && (
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
            )}

            <ListItemText>{title}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
      {generalOptionsDrawerList.map((item) => {
        const { title, path } = item;
        return (
          <ListItem key={path}>
            <ListItemButton component={Link} to={path} onClick={closeDrawer} sx={{ py: '0' }}>
              <ListItemText
                sx={{
                  ml: '0.5rem',
                }}
              >
                {title}
              </ListItemText>
              <ChevronRightOutlined />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
