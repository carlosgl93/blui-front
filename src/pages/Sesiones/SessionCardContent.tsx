import { Button, CardContent, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ScheduleServiceParams } from '@/api/appointments';
import { PaymentController } from './PaymentController';
import PaymentIcon from '@mui/icons-material/Payment';
import { PaymentInfoModal } from './PaymentInfoModal';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import { InfoController } from './InfoController';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import Loading from '@/components/Loading';

type SessionCardContentProps = {
  appointment: ScheduleServiceParams;
};

export const SessionCardContent = ({ appointment }: SessionCardContentProps) => {
  const { isLoadingVerifyPayment, handleSendUserToPayku } = PaymentController(appointment);
  const { openInfo, handleCloseInfo, handleOpenInfo } = InfoController();
  const { provider, servicio, isPaid } = appointment;
  const { firstname, lastname, email } = provider;

  if (isLoadingVerifyPayment) return <Loading />;

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
        <Text variant="body2" color="textSecondary">
          {isPaid === false ? 'Pago pendiente' : isPaid}
        </Text>
        {isPaid === false && (
          <IconButton onClick={handleOpenInfo} onMouseOver={handleOpenInfo}>
            <InfoOutlinedIcon
              sx={{
                color: 'red',
              }}
            />
          </IconButton>
        )}
        {(!isPaid || isPaid === 'Transferencia no encontrada') && (
          <Button variant="contained" onClick={handleSendUserToPayku}>
            Pagar
          </Button>
        )}
        <PaymentInfoModal
          isPaid={appointment?.isPaid}
          openInfo={openInfo}
          handleClose={handleCloseInfo}
        />
      </FlexBoxAlignCenter>
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
