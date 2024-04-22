import { Text, Title } from '@/components/StyledComponents';
import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EncuentraApoyoContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  padding: '1rem',
  marginBottom: '1rem',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  borderRadius: '.5rem',
}));

export const StyledTitle = styled(Title)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: theme.palette.primary.main,
  textAlign: 'start',
}));

const SubTitle = styled(Title)(() => ({
  fontSize: '1.375rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: 'black',
}));

const BuscarPrestadores = styled(Button)(() => ({
  width: '100%',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'white',
  margin: '1rem 0',
}));

export const ActualizarPerfil = () => {
  const router = useNavigate();

  const handleGoToProfile = () => {
    router(`/perfil-usuario`);
  };

  return (
    <EncuentraApoyoContainer>
      <StyledTitle>Actualizar perfil</StyledTitle>
      <SubTitle>Comparte tus necesidades de apoyo.</SubTitle>
      <Text>
        Agrega o actualiza acerca de tus necesidades medicas, sociales para informar a los
        prestadores.
      </Text>
      <BuscarPrestadores fullWidth variant="contained" onClick={handleGoToProfile}>
        Ir al perfil
      </BuscarPrestadores>
    </EncuentraApoyoContainer>
  );
};
