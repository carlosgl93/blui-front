import { notificationState } from '@/store/snackbar';
import resetApp from '@/utils/reset-app';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { useRegisterSW } from 'virtual:pwa-register/react';
function SW() {
  const setNotification = useSetRecoilState(notificationState);

  const {
    //eslint-disable-next-line
    offlineReady: [_offlineReady, _setOfflineReady],
    //eslint-disable-next-line
    needRefresh: [_needRefresh, _setNeedRefresh],
  } = useRegisterSW({
    onRegisteredSW(swScriptUrl, registration) {
      console.log(swScriptUrl);
      console.log(registration);
      console.log('sw registered');
    },
    onNeedRefresh() {
      setNotification({
        open: true,
        severity: 'error',
        message: `Nueva version, es necesario ${(
          <Button variant="contained" onClick={() => resetApp()}>
            actualizar
          </Button>
        )}`,
      });
    },
  });

  return null;
}

export default SW;
