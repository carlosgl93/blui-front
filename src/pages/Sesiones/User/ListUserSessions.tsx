import { AppointmentParams } from '@/api/appointments';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { Fragment, useMemo, useState } from 'react';
import { Text } from '@/components/StyledComponents';
import { UserSessionCard } from './UserSessionCard';

type ListUserSessionsProps = {
  userSessions: AppointmentParams[];
};

export const ListUserSessions = ({ userSessions }: ListUserSessionsProps) => {
  const [showPastSessions, setShowPastSessions] = useState(false);
  const { userPastSessions, userFutureSessions } = useMemo(() => {
    const userPastSessions: AppointmentParams[] = [];
    const userFutureSessions: AppointmentParams[] = [];

    userSessions.forEach((session) => {
      const dateTime = session.scheduledDate + ' ' + session.scheduledTime;
      const sesionDate = typeof dateTime === 'string' ? dateTime : undefined;
      const isPast = dayjs().isAfter(dayjs(sesionDate));
      if (isPast) {
        userPastSessions.push(session);
      } else {
        userFutureSessions.push(session);
      }
    });

    return { userPastSessions, userFutureSessions };
  }, [userSessions]);

  if (!userSessions.length) {
    return (
      <>
        <Text>Aun no tienes sesiones.</Text>
      </>
    );
  }

  return (
    <>
      {/* PAST SESSIONS BUTTON */}
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
        userPastSessions.length > 0 &&
        userPastSessions.map((appointment, y) => (
          <Fragment key={y}>
            <UserSessionCard appointment={appointment} />
          </Fragment>
        ))}
      {showPastSessions && !userPastSessions.length && (
        <Box
          sx={{
            margin: '2rem auto',
          }}
        >
          <Text>No tienes sesiones pasadas.</Text>
        </Box>
      )}

      {/* FUTURE SESSIONS MAP/ITERATION */}
      {userFutureSessions?.map((appointment, i) => (
        <Fragment key={i}>
          {i === 0 && (
            <Text
              sx={{
                px: '1rem',
              }}
            >
              Tu siguiente sesión:
            </Text>
          )}
          <UserSessionCard appointment={appointment} />
        </Fragment>
      ))}
    </>
  );
};
