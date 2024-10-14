import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Text, Title } from '@/components/StyledComponents';
import { AppointmentParams } from '@/api/appointments';
import { Box, Button, styled, Theme } from '@mui/material';
import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';

type FailedPaymentProps = {
  appointment: AppointmentParams;
  theme: Theme;
};

const StyledTitle = styled(Title)(({ theme }) => ({
  fontSize: '2rem',
  color: theme.palette.primary.main,
  marginBottom: '1rem',
}));

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '2rem',
});

export const SuccessPayment = ({ appointment, theme }: FailedPaymentProps) => {
  const navigate = useNavigate();
  return (
    <>
      <CheckCircleOutlinedIcon
        sx={{
          fontSize: '3rem',
          color: theme.palette.secondary.contrastText,
        }}
      />
      <StyledTitle>Pago exitoso</StyledTitle>
      <Text>
        <b>
          {appointment.customer.firstname}, tu sesión con {appointment.provider.firstname} fue
          pagada exitosamente.
        </b>
      </Text>
      <Text>
        Recuerda que será el dia {formatDate(appointment.scheduledDate, true)} a las{' '}
        {appointment.scheduledTime}.
      </Text>
      <Text>
        Servicio: <b>{appointment.servicio.name}</b>
      </Text>
      <Text>
        Proveedor:{' '}
        <b>
          {appointment.provider.firstname} {appointment.provider.lastname}
        </b>
      </Text>
      <Text>
        Puedes seguir chateando con {appointment.provider.firstname} en la vista de tus sesiones.
      </Text>
      <Text>
        Por favor, revisa tu correo electrónico para más detalles e instrucciones adicionales.
      </Text>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem' }}
          onClick={() => navigate('/sesiones')}
        >
          Ver detalles de la cita
        </Button>
      </ButtonContainer>
    </>
  );
};
