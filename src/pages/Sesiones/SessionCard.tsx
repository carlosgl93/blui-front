import { ScheduleServiceParams } from '../../api/appointments/scheduleAppointmentMutation';
import { Card, CardHeader } from '@mui/material';
import { SessionCardContent } from './SessionCardContent';
import { formatDate } from '@/utils/formatDate';

type SessionCardProps = {
  appointment: ScheduleServiceParams;
};

export const SessionCard = ({ appointment }: SessionCardProps) => {
  const { scheduledDate, scheduledTime } = appointment;

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
      <SessionCardContent appointment={appointment} />
    </Card>
  );
};
