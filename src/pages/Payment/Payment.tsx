import { useNavigate, useSearchParams } from 'react-router-dom';
import { Title } from '@/components/StyledComponents';
import { SuccessPayment } from './SuccessPayment';
import Loading from '@/components/Loading';
import { useAppointment } from '@/hooks';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  styled,
  useTheme,
} from '@mui/material';
import { FailedPayment } from './FailedPayment';

export const Payment = () => {
  const [params] = useSearchParams();
  const router = useNavigate();
  const theme = useTheme();
  const { appointment, isLoadingAppointment } = useAppointment(params.get('appointmentId'));

  if (isLoadingAppointment) return <Loading />;

  if (!appointment)
    return (
      <Container>
        <Title>No se encontró ninguna sesión con este id</Title>
      </Container>
    );

  return (
    <StyledBox>
      <StyledCard variant="outlined">
        <CardContent>
          {appointment.isPaid === 'Pagado' ? (
            <SuccessPayment appointment={appointment} theme={theme} />
          ) : (
            <FailedPayment theme={theme} appointment={appointment} />
          )}
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => router('/sesiones')}>
            Sesiones
          </Button>
        </CardActions>
      </StyledCard>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '1rem',
}));

const StyledCard = styled(Card)(() => ({
  padding: '2rem 1.2rem',
  justifyContent: 'space-between',
}));

export const StyledTitle = styled(Title)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2.6rem',
}));
