import { useCallback, useEffect, useRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import type { SnackbarKey } from 'notistack';
import { useRegisterSW } from 'virtual:pwa-register/react';

import useNotifications from '@/store/notifications';

// async function checkRegistration() {
//   if ('serviceWorker' in navigator) {
//     const registration = await navigator.serviceWorker.getRegistration();
//     navigator.serviceWorker.getRegistrations().then((registrations) => {
//       registrations.forEach((r) => {
//         r.addEventListener('updatefound', () => {
//           console.log('Service worker update found');
//         });
//       });
//     });
//     if (registration) {
//       console.log('Service worker was registered on page load', registration);
//     } else {
//       console.log('No service worker is currently registered', registration);
//       navigator.serviceWorker
//         .register('/service-worker.js', {
//           updateViaCache: 'none',
//         })
//         .then((registration) => {
//           registration.addEventListener('updatefound', () => {
//             // If updatefound is fired, it means that there's
//             // a new service worker being installed.
//             console.log(`Value of updateViaCache: ${registration.updateViaCache}`);
//           });
//         })
//         .catch((error) => {
//           console.error(`Service worker registration failed: ${error}`);
//         });
//     }
//   } else {
//     console.log('Service workers API not available');
//   }
// }

function SW() {
  const [, notificationsActions] = useNotifications();
  const notificationKey = useRef<SnackbarKey | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
    onRegisterError,
    onRegisteredSW,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered: ' + r);
    },
    onNeedRefresh() {
      setNeedRefresh(true);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions]);

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   checkRegistration();
    // }

    console.log('sw register error', onRegisterError);
    console.log('sw registered', onRegisteredSW);
    console.log('SW', offlineReady, needRefresh);
    if (offlineReady) {
      console.log('offlineReady');
      notificationsActions.push({
        options: {
          autoHideDuration: 4500,
          content: <Alert severity="success">App is ready to work offline.</Alert>,
        },
      });
    } else if (needRefresh) {
      console.log('needRefresh');
      notificationKey.current = notificationsActions.push({
        message: 'New content is available, click on reload button to update.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <>
              <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
              <Button onClick={close}>Close</Button>
            </>
          ),
        },
      });
    }
  }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker]);

  console.log('needRefresh', needRefresh);
  console.log('offlineReady', offlineReady);

  return null;
}

export default SW;
