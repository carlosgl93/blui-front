import { userAppointmentsState } from '@/store/appointments';
import { Text } from '@/components/StyledComponents';
import { SessionCard } from './SessionCard';
import { useRecoilValue } from 'recoil';
import { Fragment } from 'react';
import { useAuthNew } from '@/hooks';
import { providerAppointmentsState } from '@/store/appointments/providerAppointmentsState';
import { ProviderSessionCard } from './ProviderSessionCard';

export const ListSesiones = () => {
  const userSessions = useRecoilValue(userAppointmentsState);
  const providerSessions = useRecoilValue(providerAppointmentsState);

  const { user } = useAuthNew();

  if (user?.id) {
    return userSessions?.map((appointment, i) => (
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
        <SessionCard appointment={appointment} />
      </Fragment>
    ));
  } else {
    return providerSessions?.map((appointment, i) => (
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
    ));
  }
};
