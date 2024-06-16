import { notificationState } from '@/store/snackbar';
import { useSnackbarController } from '@/store/snackbar/useSnackbarController';
import { Alert, Snackbar } from '@mui/material';
import { useRecoilValue } from 'recoil';

export const NotificationSnackbar = () => {
  const notification = useRecoilValue(notificationState);
  const { open, message, severity, action, persist } = notification;
  const { onClose } = useSnackbarController();

  return (
    <Snackbar
      sx={{
        mb: '5vh',
      }}
      open={open}
      autoHideDuration={persist ? null : 6000}
      onClose={onClose}
    >
      <Alert action={action} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
