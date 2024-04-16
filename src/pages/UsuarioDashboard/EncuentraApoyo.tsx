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

export const EncuentraApoyo = () => {
  const router = useNavigate();

  const handleBuscarPrestadores = () => {
    router('/resultados');
  };

  return (
    <EncuentraApoyoContainer>
      <StyledTitle>Encuentra apoyo</StyledTitle>
      <SubTitle>Explora los perfiles de los prestadores.</SubTitle>
      <Text>
        Usa filtros tales como la comuna, tipo de servicio y especialidad, luego chatea con los
        prestadores acerca de los servicios que necesitas.
      </Text>
      <BuscarPrestadores fullWidth variant="contained" onClick={handleBuscarPrestadores}>
        Buscar prestadores
      </BuscarPrestadores>
    </EncuentraApoyoContainer>
  );
};
