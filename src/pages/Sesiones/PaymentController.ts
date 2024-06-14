import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import {
  paymentVerificationFailedMutation,
  savePaymentMutation,
  verifyPaymentMutation,
} from '@/api/appointments';
import { notificationState } from '@/store/snackbar';
import { useAuthNew } from '@/hooks';
// import axios from 'axios';

export const PaymentController = (appointmentId?: string) => {
  const [openPayment, setOpenPayment] = useState(false);
  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);
  const setNotification = useSetRecoilState(notificationState);
  const client = useQueryClient();
  const { user } = useAuthNew();

  const { mutate: savePayment, isLoading } = useMutation(savePaymentMutation, {
    onSuccess: async () => {
      // await axios.post('https://us-central1-blui-310f4.cloudfunctions.net/userPaidAppointment', {
      //   userEmail: user?.email,
      //   appointmentId,
      // });
      client.invalidateQueries(['userAppointments', user?.id]);
      setNotification({
        open: true,
        message: 'Confirmaremos tu sesion en breve',
        severity: 'success',
      });
      handleClosePayment();
    },
  });

  const { mutate: verifyPayment, isLoading: isLoadingVerifyPayment } = useMutation(
    verifyPaymentMutation,
    {
      onSuccess: () => {
        client.invalidateQueries(['allAppointments']);
        setNotification({
          open: true,
          message: 'Sesión confirmada',
          severity: 'success',
        });
      },
    },
  );

  const { mutate: paymentVerificationFailed, isLoading: isLoadingPaymentVerificationFailed } =
    useMutation(paymentVerificationFailedMutation, {
      onSuccess: () => {
        client.invalidateQueries(['allAppointments']);
        setNotification({
          open: true,
          message: 'Sesión actualizada, el usuario será notificado',
          severity: 'success',
        });
      },
    });

  const handlePayment = () => {
    if (!appointmentId) throw new Error('No appointment id provided');
    savePayment(appointmentId);
  };

  const handleVerifyPayment = (appId: string) => {
    verifyPayment(appId);
  };

  const handlePaymentVerificationFailed = (appId: string) => {
    paymentVerificationFailed(appId);
  };

  return {
    openPayment,
    isLoading,
    isLoadingVerifyPayment,
    isLoadingPaymentVerificationFailed,
    handleOpenPayment,
    handleClosePayment,
    handlePayment,
    handleVerifyPayment,
    handlePaymentVerificationFailed,
  };
};
