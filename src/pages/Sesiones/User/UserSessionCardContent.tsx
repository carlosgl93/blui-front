import { UserAppointmentController } from './UserAppointmentController';
import { Button, CardContent, CircularProgress } from '@mui/material';
import { AppointmentParams } from '@/api/appointments';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import { Rate } from '@/components';

type SessionCardContentProps = {
  appointment: AppointmentParams;
};

export const UserSessionCardContent = ({ appointment }: SessionCardContentProps) => {
  const { provider, servicio, isPaid, status, confirmedByUser } = appointment;
  const { firstname, lastname, email } = provider;

  const {
    isPast,
    rateAppointmentLoading,
    confirmAppointmentDoneLoading,
    handleConfirmAppointmentDone,
    handleRateAppointment,
  } = UserAppointmentController(appointment);
  console.log(appointment);

  return (
    <CardContent>
      <FlexBoxAlignCenter>
        <PersonIcon
          sx={{
            color: 'primary.main',
          }}
        />
        <Text variant="body2" color="textSecondary">
          {firstname && lastname ? `${firstname} ${lastname}` : email}
        </Text>
      </FlexBoxAlignCenter>
      <FlexBoxAlignCenter>
        <WorkIcon
          sx={{
            color: 'primary.main',
          }}
        />
        <Text variant="body2" color="textSecondary">
          {servicio?.name}
        </Text>
      </FlexBoxAlignCenter>
      <FlexBoxAlignCenter>
        <PaymentIcon
          sx={{
            color: isPaid ? 'primary.main' : 'secondary.contrastText',
          }}
        />
        <Text
          variant="body2"
          color="textSecondary"
          sx={{
            textAlign: 'start',
          }}
        >
          {status === 'Esperando confirmación del cliente' ? 'Esperando tu confirmación' : status}
        </Text>
      </FlexBoxAlignCenter>
      {confirmAppointmentDoneLoading && <CircularProgress />}
      {isPast && status === 'Esperando confirmación del cliente' && !confirmAppointmentDoneLoading && (
        <Button
          sx={{
            my: 2,
          }}
          variant="contained"
          onClick={handleConfirmAppointmentDone}
        >
          Confirmar sesión recibida
        </Button>
      )}
      {isPast &&
        confirmedByUser &&
        (rateAppointmentLoading ? (
          <CircularProgress />
        ) : (
          <Rate rate={appointment.rating} handleRateAppointment={handleRateAppointment} />
        ))}
    </CardContent>
  );
};

type FlexBoxAlignCenterProps = {
  children: React.ReactNode;
};

const FlexBoxAlignCenter: React.FC<FlexBoxAlignCenterProps> = ({ children }) => {
  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {children}
    </FlexBox>
  );
};
