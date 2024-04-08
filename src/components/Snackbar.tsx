import { notificationState } from '@/store/snackbar';
import { useSnackbarController } from '@/store/snackbar/useSnackbarController';
import { Alert, Snackbar } from '@mui/material';
import { useRecoilState } from 'recoil';

export const NotificationSnackbar = () => {
  const [notification] = useRecoilState(notificationState);
  const { open, message, severity } = notification;
  const { onClose } = useSnackbarController();

  return (
    <Snackbar
      sx={{
        mb: '5vh',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
