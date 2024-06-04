import { notificationState } from '@/store/snackbar';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRegisterSW } from 'virtual:pwa-register/react';
function SW() {
  const setNotification = useSetRecoilState(notificationState);

  const {
    //eslint-disable-next-line
    offlineReady: [_offlineReady, _setOfflineReady],
    //eslint-disable-next-line
    needRefresh: [needRefresh, _setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  useEffect(() => {
    if (needRefresh) {
      setNotification({
        message: `Nueva version, necesitas refrescar la app: ${(
          <Button variant="contained" onClick={() => updateServiceWorker(true)}>
            Refrescar
          </Button>
        )}`,
        open: true,
        severity: 'warning',
      });
    }
  }, [needRefresh, updateServiceWorker]);
  return null;
}

export default SW;
