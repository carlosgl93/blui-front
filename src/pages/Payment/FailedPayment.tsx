import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { StyledTitle } from './Payment';
import { Text } from '@/components/StyledComponents';
import { ScheduleServiceParams } from '@/api/appointments';
import { Theme } from '@mui/material';

type FailedPaymentProps = {
  appointment: ScheduleServiceParams;
  theme: Theme;
};

export const FailedPayment = ({ appointment, theme }: FailedPaymentProps) => {
  return (
    <>
      <ReportGmailerrorredOutlinedIcon
        sx={{
          fontSize: '3rem',
          color: theme.palette.secondary.contrastText,
        }}
      />
      <StyledTitle>Pago fallido</StyledTitle>
      <Text>Lamentablemente algo salió mal con el pago, por favor intentalo nuevamente.</Text>
      <Text>
        <b>
          {appointment.customer.firstname}, tranquilo/a no se desconto ningún monto de tu cuenta.
        </b>
      </Text>
      <Text>
        Aún puedes realizar el pago para asegurar tu sesión con {appointment.provider.firstname}.
      </Text>
    </>
  );
};
