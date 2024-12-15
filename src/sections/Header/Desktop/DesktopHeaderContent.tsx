import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { routesToExcludeInHeader } from '../routesToExcludeInHeader';
import { Link, useNavigate } from 'react-router-dom';
import { FlexBox, HeaderIconImage } from '@/components/styled';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, useTheme, IconButton, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';
import routes from '@/routes';
import { useAuthNew } from '@/hooks';
import useSidebar from '@/store/sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { Prestador } from '@/store/auth/prestador';
import { User } from '@/store/auth/user';
import BackButton from '@/components/BackButton';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import { useRecoilValue } from 'recoil';
import { chatState } from '@/store/chat/chatStore';

const DesktopHeaderContent = () => {
  const { user, prestador } = useAuthNew();
  const [, sidebarActions] = useSidebar();
  const chats = useRecoilValue(chatState);
  const username = chats?.username;
  const prestadorName = chats?.providerName;
  const isUserChat = location.pathname === '/chat';
  const isProviderChat = location.pathname === '/prestador-chat';

  if (isUserChat) {
    return (
      <FlexBox
        sx={{
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '100px',
          }}
        >
          <BackButton ignoreMargin displayText={false} />
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <ChatTitle
            sx={{
              fontSize: '1.5rem',
            }}
          >
            Chateando con{' '}
            {prestadorName
              ? prestadorName
              : prestador?.firstname
              ? prestador?.firstname
              : prestador?.email}
          </ChatTitle>
        </Box>
      </FlexBox>
    );
  }

  if (isProviderChat) {
    return (
      <FlexBox
        sx={{
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '100px',
          }}
        >
          <BackButton ignoreMargin displayText={false} />
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <ChatTitle
            sx={{
              fontSize: '1.5rem',
            }}
          >
            Chateando con {username}
          </ChatTitle>
        </Box>
      </FlexBox>
    );
  }

  return (
    <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <BurgerIconWithLogo prestador={prestador} toggle={sidebarActions.toggle} user={user} />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {user?.role !== 'admin' &&
          Object.values(routes)
            .filter((route) => route.title)
            .map(({ path, title, icon: Icon }) =>
              routesToExcludeInHeader.includes(path) ? null : (
                <div
                  key={path}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ListItem>
                    <ListItemButton component={Link} to={path as string}>
                      {Icon && (
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                      )}

                      <ListItemText>{title}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </div>
              ),
            )}

        {user?.role === 'admin' ? (
          <AdminHeaderContent />
        ) : user?.role === 'user' ? (
          <UserHeaderContent />
        ) : prestador?.email ? (
          <ProviderHeaderContent />
        ) : (
          <UnauthenticatedHeaderContent />
        )}
      </List>
    </FlexBox>
  );
};

export default DesktopHeaderContent;

type BurgerIconWithLogoProps = {
  user: User | null;
  prestador: Prestador | null;
  toggle: () => void;
};

const BurgerIconWithLogo = ({ user, prestador, toggle }: BurgerIconWithLogoProps) => {
  return (
    <FlexBox
      sx={{
        width: '30vw',
      }}
    >
      {(user?.email || prestador?.email) && (
        <IconButton
          onClick={toggle}
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}

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

const AdminHeaderContent = () => {
  const { logout } = useAuthNew();
  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  return (
    <>
      <ListItem sx={{ mx: 'auto' }}>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText>Backoffice</ListItemText>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }} onClick={() => navigate('/backoffice/prestadores')}>
        <ListItemIcon>
          <PeopleOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText>Prestadores</ListItemText>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }} onClick={() => navigate('/backoffice/pagos')}>
        <ListItemIcon>
          <PaymentOutlinedIcon />
        </ListItemIcon>
        <ListItemText>Pagos</ListItemText>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => logout()}
        >
          Salir
        </Button>
      </ListItem>
    </>
  );
};

const UserHeaderContent = () => {
  const theme = useTheme();
  const { logout } = useAuthNew();
  return (
    <>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          component={Link}
          to="/resultados"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          }}
        >
          Buscar
        </Button>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          component={Link}
          to="/usuario-dashboard"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          }}
        >
          Perfil
        </Button>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          onClick={() => logout()}
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Salir
        </Button>
      </ListItem>
    </>
  );
};

const ProviderHeaderContent = () => {
  const theme = useTheme();
  const { logout } = useAuthNew();
  return (
    <>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          component={Link}
          to="/prestador-dashboard"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          }}
        >
          Perfil
        </Button>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          onClick={() => logout()}
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Salir
        </Button>
      </ListItem>
    </>
  );
};

const UnauthenticatedHeaderContent = () => {
  const theme = useTheme();

  return (
    <>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          component={Link}
          to="/ingresar"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          }}
        >
          Ingresar
        </Button>
      </ListItem>
      {/* <ListItem sx={{ mx: 'auto', width: '100%' }}>
        <Button
          component={Link}
          to="/persona-de-apoyo"
          sx={{
            whiteSpace: 'nowrap',
            width: 'auto',
            textOverflow: 'ellipsis',
          }}
          variant="outlined"
        >
          Conviértete en persona de apoyo
        </Button>
      </ListItem> */}
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          component={Link}
          to="/resultados"
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Explorar
        </Button>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          component={Link}
          to="/comienzo"
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Comenzar
        </Button>
      </ListItem>
    </>
  );
};
