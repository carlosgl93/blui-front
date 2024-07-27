import { ScheduleServiceParams } from '../../api/appointments/scheduleAppointmentMutation';
import { Card, CardHeader, CardContent, Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import { PaymentModal } from './PaymentModal';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils/formatDate';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatState } from '@/store/chat/chatStore';

type SessionCardProps = {
  appointment: ScheduleServiceParams;
};

export const ProviderSessionCard = ({ appointment }: SessionCardProps) => {
  const { scheduledDate, scheduledTime, servicio, isPaid, customer } = appointment;
  const [chat, setChat] = useRecoilState(chatState);
  const [openPayment, setOpenPayment] = useState(false);
  const navigate = useNavigate();

  const handleClosePayment = () => setOpenPayment(false);
  const handleContact = () => {
    setChat({
      ...chat,
      id: customer.id,
      username: `${customer.firstname} ${customer.lastname}`,
    });
    navigate('/prestador-chat');
  };

  return (
    <Card sx={{ my: 2, borderRadius: '1rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <CardHeader
        title={`${formatDate(scheduledDate, true)}`}
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
