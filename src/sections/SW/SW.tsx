import { notificationState } from '@/store/snackbar';
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
    onNeedRefresh() {
      setNotification({
        open: true,
        severity: 'error',
        message: `Nueva versión, la app será recargada`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    },
  });

  return null;
}

export default SW;
