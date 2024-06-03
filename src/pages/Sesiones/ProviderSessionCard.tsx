import { ScheduleServiceParams } from '../../api/appointments/scheduleAppointmentMutation';
import { Card, CardHeader, CardContent, Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import { useState } from 'react';
import { PaymentModal } from './PaymentModal';
import { useNavigate } from 'react-router-dom';

type SessionCardProps = {
  appointment: ScheduleServiceParams;
};

export const ProviderSessionCard = ({ appointment }: SessionCardProps) => {
  const { scheduledDate, scheduledTime, servicio, isPaid, customer } = appointment;
  const [openPayment, setOpenPayment] = useState(false);
  const navigate = useNavigate();

  const handleClosePayment = () => setOpenPayment(false);
  const handleContact = () => navigate('/prestador-chat');

  return (
    <Card sx={{ my: 2, borderRadius: '1rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <CardHeader
        title={`${scheduledDate}`}
        subheader={`a las ${scheduledTime}`}
        titleTypographyProps={{
          variant: 'h5',
          color: 'secondary.contrastText',
          fontWeight: 'bold',
        }}
      />
      <CardContent>
        <FlexBox
          sx={{
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <PersonIcon
            sx={{
              color: 'primary.main',
            }}
          />
          <Text variant="body2" color="textSecondary">
            {customer.firstname} {customer.lastname}
          </Text>
        </FlexBox>
        <FlexBox
          sx={{
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <WorkIcon
            sx={{
              color: 'primary.main',
            }}
          />
          <Text variant="body2" color="textSecondary">
            {servicio?.name}
          </Text>
        </FlexBox>
        <FlexBox
          sx={{
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <PaymentIcon
            sx={{
              color: isPaid ? 'primary.main' : 'secondary.contrastText',
            }}
          />
          <Text variant="body2" color="textSecondary">
            {isPaid ? 'Pagado' : 'No pagado'}
          </Text>
          {!isPaid && (
            <Button variant="contained" onClick={handleContact}>
              Contactar
            </Button>
          )}
          <PaymentModal
            paymentAmount={servicio?.price}
            openPayment={openPayment}
            handleClose={handleClosePayment}
          />
        </FlexBox>
      </CardContent>
    </Card>
  );
};
