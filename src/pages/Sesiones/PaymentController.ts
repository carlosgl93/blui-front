import { savePaymentMutation } from '@/api/appointments/savePaymentMutation';
import { useAuthNew } from '@/hooks';
import { notificationState } from '@/store/snackbar';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

export const PaymentController = (appointmentId?: string) => {
  const [openPayment, setOpenPayment] = useState(false);
  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);
  const setNotification = useSetRecoilState(notificationState);
  const client = useQueryClient();
  const { user } = useAuthNew();

  const { mutate: savePayment, isLoading } = useMutation(savePaymentMutation, {
    onSuccess: () => {
      client.invalidateQueries(['userAppointments', user?.id]);
      setNotification({
        open: true,
        message: 'Sesion confirmada',
        severity: 'success',
      });
      handleClosePayment();
    },
  });

  const handlePayment = () => {
    if (!appointmentId) throw new Error('No appointment id provided');
    savePayment(appointmentId);
  };

  return {
    openPayment,
    isLoading,
    handleOpenPayment,
    handleClosePayment,
    handlePayment,
  };
};
