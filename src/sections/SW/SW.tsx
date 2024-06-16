import { notificationState } from '@/store/snackbar';
import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRegisterSW } from 'virtual:pwa-register/react';
function SW() {
  const [notification, setNotification] = useRecoilState(notificationState);

  const {
    //eslint-disable-next-line
    offlineReady: [_offlineReady, setOfflineReady],
    //eslint-disable-next-line
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onNeedRefresh() {
      () => setNeedRefresh(true);
    },
  });

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notification.open) {
      setNotification({
        ...notification,
        open: false,
      });
    }
  }, [setOfflineReady, setNeedRefresh, notification, setNotification]);

  useEffect(() => {
    if (needRefresh) {
      setNotification({
        message: 'Actualización instalada, por favor recarga la página.',
        open: true,
        severity: 'warning',
        action: (
          <>
            <Button onClick={() => updateServiceWorker(true)}>Recargar</Button>
            <Button onClick={close}>Cerrar</Button>
          </>
        ),
      });
    }
  }, [needRefresh, updateServiceWorker]);
  return null;
}

export default SW;
