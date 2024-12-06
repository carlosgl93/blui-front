import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Appointment } from '@/api/appointments';
import { Box, styled, Theme } from '@mui/material';
import { ButtonCTA } from '../UsuarioDashboard/StyledComponents';
import { customerSupportPhone } from '@/config';
import { Text } from '@/components/StyledComponents';

type FailedPaymentProps = {
  appointment: Appointment;
  theme: Theme;
};

const StyledTitle = styled(Text)(({ theme }) => ({
  fontSize: '2rem',
  color: theme.palette.primary.main,
  marginBottom: '1rem',
}));

const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '2rem',
}));

export const FailedPayment = ({ appointment, theme }: FailedPaymentProps) => {
  return (
    <>
      <ReportGmailerrorredOutlinedIcon
        sx={{
          fontSize: '3rem',
          color: theme.palette.error.main,
          marginBottom: '1rem',
        }}
      />
      <StyledTitle>Pago fallido</StyledTitle>
      <Text>Lamentablemente algo salió mal con el pago, por favor intentalo nuevamente.</Text>
      <Text>
        <b>
          {appointment.customer.firstname}, tranquilo/a no se descontó ningún monto de tu cuenta.
        </b>
      </Text>
      <Text>
        Aún puedes realizar el pago para asegurar tu sesión con {appointment.provider.firstname}.
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
        Por favor, revisa tu correo electrónico para más detalles e instrucciones adicionales.
      </Text>
      <ButtonContainer>
        <ButtonCTA
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = appointment!.paykuPaymentURL!)}
        >
          Reintentar pago
        </ButtonCTA>
        <ButtonCTA
          variant="contained"
          color="primary"
          href={(window.location.href = `tel:${customerSupportPhone}`)}
        >
          Contactar soporte
        </ButtonCTA>
      </ButtonContainer>
    </>
  );
};
