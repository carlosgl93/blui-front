import { ProviderAppointmentController } from './ProviderAppointmentController';
import { Box, Button, CardContent, CircularProgress } from '@mui/material';
import { AppointmentParams } from '@/api/appointments';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';

type SessionCardContentProps = {
  appointment: AppointmentParams;
};

export const ProviderSessionCardContent = ({ appointment }: SessionCardContentProps) => {
  const { customer, servicio, isPaid, status } = appointment;
  const { firstname, lastname, email } = customer;
  const { isPast, appointmentDoneLoading, handleAppointmentDone } =
    ProviderAppointmentController(appointment);

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
      {appointmentDoneLoading ? (
        <CircularProgress />
      ) : (
        <>
          <FlexBoxAlignCenter>
            <PaymentIcon
              sx={{
                color: isPaid ? 'primary.main' : 'secondary.contrastText',
              }}
            />
            <Text
              variant="body2"
              color="textSecondary"
              justifyContent="left"
              sx={{
                textAlign: 'start',
              }}
            >
              {status}
            </Text>
          </FlexBoxAlignCenter>
          {isPast && status === 'Agendada' && (
            <Box>
              <Button
                sx={{
                  my: 2,
                }}
                variant="contained"
                onClick={handleAppointmentDone}
              >
                Marcar como realizada
              </Button>
            </Box>
          )}
        </>
      )}
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
