import { AppointmentParams } from '@/api/appointments';
import PaymentIcon from '@mui/icons-material/Payment';
import { Text } from '@/components/StyledComponents';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { FlexBox } from '@/components/styled';
import { CardContent } from '@mui/material';
import { Rate } from '@/components';
import { useMemo } from 'react';
import dayjs from 'dayjs';

type SessionCardContentProps = {
  appointment: AppointmentParams;
};

export const UserSessionCardContent = ({ appointment }: SessionCardContentProps) => {
  const { provider, servicio, isPaid, scheduledDate, scheduledTime } = appointment;
  const { firstname, lastname, email } = provider;
  const isPast = useMemo(() => {
    const dateTime = scheduledDate + ' ' + scheduledTime;
    const sesionDate = typeof dateTime === 'string' ? dateTime : undefined;
    return dayjs().isAfter(dayjs(sesionDate));
  }, [scheduledDate, scheduledTime]);

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
          {isPaid && !isPast ? 'Pagada' : 'Realizada'}
        </Text>
      </FlexBoxAlignCenter>
      {isPast && <Rate />}
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
