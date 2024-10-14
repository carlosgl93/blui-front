import { useSearchParams } from 'react-router-dom';
import { Title } from '@/components/StyledComponents';
import { SuccessPayment } from './SuccessPayment';
import Loading from '@/components/Loading';
import { useAppointment } from '@/hooks';
import { Box, Card, CardContent, Container, styled, useTheme } from '@mui/material';
import { FailedPayment } from './FailedPayment';

export const Payment = () => {
  const [params] = useSearchParams();
  const theme = useTheme();
  const {
    appointment,
    isLoadingAppointment,
    appointmentError,
    paykuPayment,
    isLoadingPaykuPayment,
    paykuPaymentError,
  } = useAppointment(params.get('appointmentId'));

  if (isLoadingAppointment || isLoadingPaykuPayment) return <Loading />;

  if (appointmentError || paykuPaymentError)
    return (
      <StyledBox>
        <StyledCard variant="outlined">
          <CardContent>
            <Title>Hubo un error al cargar esta informacion, por favor intentalo nuevamente</Title>
          </CardContent>
        </StyledCard>
      </StyledBox>
    );

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
          {appointment.isPaid === 'Pagado' || paykuPayment?.status === 'success' ? (
            <SuccessPayment appointment={appointment} theme={theme} />
          ) : (
            <FailedPayment theme={theme} appointment={appointment} />
          )}
        </CardContent>
      </StyledCard>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '1rem',
  minHeight: '75vh',
}));

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  padding: '2rem 1.2rem',
  justifyContent: 'space-between',
  textAlign: 'center',
  alignItems: 'center',
}));

export const StyledTitle = styled(Title)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2.6rem',
}));
