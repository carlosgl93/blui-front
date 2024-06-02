import { ScheduleServiceParams } from '../../api/appointments/scheduleAppointmentMutation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Card, CardHeader, CardContent, Button, IconButton } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import { useState } from 'react';
import { PaymentInfoModal } from './PaymentInfoModal';
import { PaymentModal } from './PaymentModal';

type SessionCardProps = {
  appointment: ScheduleServiceParams;
};

export const SessionCard = ({ appointment }: SessionCardProps) => {
  const { scheduledDate, scheduledTime, provider, servicio, isPaid } = appointment;
  const [openInfo, setOpenInfo] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);

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
            {provider?.email}
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
          {isPaid ? (
            <IconButton onClick={handleOpenInfo} onMouseOver={handleOpenInfo}>
              <InfoOutlinedIcon
                sx={{
                  color: 'green',
                }}
              />
            </IconButton>
          ) : (
            <IconButton onClick={handleOpenInfo} onMouseOver={handleOpenInfo}>
              <InfoOutlinedIcon
                onMouseOver={handleOpenInfo}
                sx={{
                  color: 'red',
                }}
              />
            </IconButton>
          )}
          <PaymentInfoModal openInfo={openInfo} handleClose={handleCloseInfo} />
          {!isPaid && (
            <Button variant="contained" onClick={handleOpenPayment}>
              Pagar
            </Button>
          )}
          <PaymentModal
            paymentAmount={servicio.price}
            openPayment={openPayment}
            handleClose={handleClosePayment}
          />
        </FlexBox>
      </CardContent>
    </Card>
  );
};
