import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { StyledTitle } from './Payment';
import { Text } from '@/components/StyledComponents';
import { ScheduleServiceParams } from '@/api/appointments';
import { Theme } from '@mui/material';
import { formatDate } from '@/utils/formatDate';

type FailedPaymentProps = {
  appointment: ScheduleServiceParams;
  theme: Theme;
};

export const SuccessPayment = ({ appointment, theme }: FailedPaymentProps) => {
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
    </>
  );
};
