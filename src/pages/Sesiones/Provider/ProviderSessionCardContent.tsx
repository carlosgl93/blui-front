import { ProviderAppointmentController } from './ProviderAppointmentController';
import { Box, Button, CardContent } from '@mui/material';
import { AppointmentParams } from '@/api/appointments';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import Loading from '@/components/Loading';

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
        <Loading />
      ) : (
        <>
          <FlexBoxAlignCenter>
            <PaymentIcon
              sx={{
                color: isPaid ? 'primary.main' : 'secondary.contrastText',
              }}
            />
            <Text variant="body2" color="textSecondary">
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
