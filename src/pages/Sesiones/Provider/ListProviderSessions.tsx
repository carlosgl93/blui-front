import dayjs from 'dayjs';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Fragment, useMemo, useState } from 'react';
import { Text } from '@/components/StyledComponents';
import { AppointmentParams } from '@/api/appointments';
import { ProviderSessionCard } from './ProviderSessionCard';

type ListProviderSessionsProps = {
  providerSessions: AppointmentParams[];
};

export const ListProviderSessions = ({ providerSessions }: ListProviderSessionsProps) => {
  const [showPastSessions, setShowPastSessions] = useState(false);
  const { providerPastSessions, providerFutureSessions } = useMemo(() => {
    const providerPastSessions: AppointmentParams[] = [];
    const providerFutureSessions: AppointmentParams[] = [];

    providerSessions.forEach((session) => {
      const dateTime = session.scheduledDate + ' ' + session.scheduledTime;
      const sesionDate = typeof dateTime === 'string' ? dateTime : undefined;
      const isPast = dayjs().isAfter(dayjs(sesionDate));
      if (isPast) {
        providerPastSessions.push(session);
      } else {
        providerFutureSessions.push(session);
      }
    });

    return { providerPastSessions, providerFutureSessions };
  }, [providerSessions]);

  if (!providerSessions.length) {
    return (
      <>
        <Text>Aun no tienes sesiones.</Text>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button
          sx={{ my: 2 }}
          variant={showPastSessions ? 'contained' : 'outlined'}
          onClick={() => setShowPastSessions((prev) => !prev)}
        >
          {showPastSessions ? 'Pasadas' : 'Futuras'}
        </Button>
      </Box>
      {/* PAST SESSIONS MAP/ITERATION */}
      {showPastSessions &&
        providerPastSessions.map((appointment, y) => (
          <Fragment key={y}>
            <ProviderSessionCard appointment={appointment} />
          </Fragment>
        ))}
      {providerFutureSessions?.map((appointment, i) => (
        <Fragment key={i}>
          {i === 0 ? (
            <Text
              sx={{
                px: '1rem',
              }}
            >
              Tu siguiente sesión:
            </Text>
          ) : null}
          <ProviderSessionCard appointment={appointment} />
        </Fragment>
      ))}
    </>
  );
};
