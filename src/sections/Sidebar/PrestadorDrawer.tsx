import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Avatar, Box, Divider } from '@mui/material';

import { generalOptionsDrawerList, prestadorDrawerOptions } from './prestadorDrawerOptions';
import { ChevronRightOutlined } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { Prestador, prestadorState } from '@/store/auth/prestador';
import { useAuthNew } from '@/hooks/useAuthNew';

type PrestadorDrawerListProps = {
  closeDrawer: () => void;
};

function PrestadorDrawerList({ closeDrawer }: PrestadorDrawerListProps) {
  const { logout } = useAuthNew();

  const prestador = useRecoilValue(prestadorState) as Prestador;

  const { firstname, lastname, servicio } = prestador;

  return (
    <List
      component={'nav'}
      sx={{
        width: 250,
        // pt: (theme) => `${theme.mixins.toolbar.minHeight}px`,
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

          <span
            style={{
              fontSize: '0.85rem',
            }}
          >
            {servicio}
          </span>
        </Box>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => {
            logout();
            closeDrawer();
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Salir
        </ListItemButton>
      </ListItem>

      <Divider />

      {prestadorDrawerOptions.map(({ path, title, icon: Icon }) => (
        <ListItem sx={{ p: 'auto' }} key={path}>
          <ListItemButton component={Link} to={path as string} onClick={closeDrawer}>
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
            <ListItemButton component={Link} to={path} onClick={closeDrawer}>
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
}

export default PrestadorDrawerList;
