import { UserAppointmentController } from './UserAppointmentController';
import { Box, Button, CardContent, CircularProgress } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { AppointmentParams, TStatus } from '@/api/appointments';
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
  const { provider, servicio, isPaid, status, confirmedByUser, rating } = appointment;
  const { firstname, lastname, email } = provider;

  const {
    isPast,
    rateAppointmentLoading,
    confirmAppointmentDoneLoading,
    handleConfirmAppointmentDone,
    handleRateAppointment,
    handleChat,
  } = UserAppointmentController(appointment);

  return (
    <CardContent>
      <Person firstname={firstname} lastname={lastname} email={email} />
      <Work serviceName={servicio?.name} />
      <Payment isPaid={isPaid} status={status} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {!isPast && (
          <Button startIcon={<ChatOutlinedIcon />} variant="contained" onClick={handleChat}>
            Chat
          </Button>
        )}
      </Box>
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
        rating === 0 &&
        (rateAppointmentLoading ? (
          <CircularProgress />
        ) : (
          <Rate
            rate={appointment.rating}
            providerName={provider.firstname || provider.email || ''}
            handleRateAppointment={handleRateAppointment}
          />
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

type PersonProps = {
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
};
const Person = ({ firstname, lastname, email }: PersonProps) => {
  return (
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
  );
};

type WorkProps = {
  serviceName: string | undefined;
};
const Work = ({ serviceName }: WorkProps) => {
  return (
    <FlexBoxAlignCenter>
      <WorkIcon
        sx={{
          color: 'primary.main',
        }}
      />
      <Text variant="body2" color="textSecondary">
        {serviceName}
      </Text>
    </FlexBoxAlignCenter>
  );
};

type PaymentProps = {
  isPaid: boolean | string | undefined;
  status: TStatus;
};

const Payment = ({ isPaid, status }: PaymentProps) => {
  return (
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
  );
};
