import { ScheduleServiceParams } from '../../api/appointments/scheduleAppointmentMutation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Card, CardHeader, CardContent, Button, IconButton } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import { PaymentInfoModal } from './PaymentInfoModal';
import { PaymentModal } from './PaymentModal';
import { formatDate } from '@/utils/formatDate';
import { PaymentController } from './PaymentController';
import { InfoController } from './InfoController';
import Loading from '@/components/Loading';

type SessionCardProps = {
  appointment: ScheduleServiceParams;
};

export const SessionCard = ({ appointment }: SessionCardProps) => {
  const { scheduledDate, scheduledTime, provider, servicio, isPaid } = appointment;
  const { openInfo, handleCloseInfo, handleOpenInfo } = InfoController();
  const {
    openPayment,
    handleClosePayment,
    handleOpenPayment,
    handlePayment,
    isLoadingVerifyPayment,
  } = PaymentController(appointment.id);

  if (isLoadingVerifyPayment) return <Loading />;

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
            {provider.firstname && provider.lastname
              ? `${provider.firstname} ${provider.lastname}`
              : provider?.email}
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
            {isPaid}
          </Text>
          {isPaid === false ? (
            <IconButton onClick={handleOpenInfo} onMouseOver={handleOpenInfo}>
              <InfoOutlinedIcon
                sx={{
                  color: 'red',
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
          <PaymentInfoModal
            isPaid={appointment.isPaid}
            openInfo={openInfo}
            handleClose={handleCloseInfo}
          />
          {!isPaid ||
            (isPaid === 'Transferencia no encontrada' && (
              <Button variant="contained" onClick={handleOpenPayment}>
                Pagar
              </Button>
            ))}
          <PaymentModal
            paymentAmount={servicio.price}
            openPayment={openPayment}
            handleClose={handleClosePayment}
            handlePayment={() => handlePayment()}
          />
        </FlexBox>
      </CardContent>
    </Card>
  );
};
