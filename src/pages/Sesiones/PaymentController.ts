import { createTransaction } from '@/api/payments/createTransaction';
import { useMutation, useQueryClient } from 'react-query';
import { notificationState } from '@/store/snackbar';
import { useSetRecoilState } from 'recoil';
import { sendEmailApi } from '@/api';
import { useAuthNew } from '@/hooks';
import {
  paymentVerificationFailedMutation,
  savePaymentMutation,
  AppointmentParams,
  verifyPaymentMutation,
} from '@/api/appointments';

export const PaymentController = (appointment?: AppointmentParams) => {
  const setNotification = useSetRecoilState(notificationState);
  const client = useQueryClient();
  const { user } = useAuthNew();

  const handleSendUserToPayku = async () => {
    const paykuRes = await createTransaction(appointment);
    if (paykuRes) {
      // window.open(paykuRes.url, '_blank');
      window.location.href = paykuRes.url;
    }
  };

  const { mutate: savePayment, isLoading } = useMutation(savePaymentMutation, {
    onSuccess: () => {
      sendEmailApi({
        data: {
          from: 'Francisco Durney <francisco.durney@blui.cl>',
          to: 'francisco.durney@blui.cl',
          subject: 'Usuario ha pagado una cita',
          text: `${user?.email} claimed to have paid for appointment ${appointment?.id}.`,
          html: `<p>${user?.email} claimed to have paid for appointment ${appointment?.id}.</p>`,
        },
      });
      client.invalidateQueries(['userAppointments', user?.id]);
      setNotification({
        open: true,
        message: 'Confirmaremos tu sesion en breve',
        severity: 'success',
      });
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
    if (!appointment?.id) throw new Error('No appointment id provided');
    savePayment(appointment?.id);
  };

  const handleVerifyPayment = (appId: string) => {
    verifyPayment(appId);
  };

  const handlePaymentVerificationFailed = (appId: string) => {
    paymentVerificationFailed(appId);
  };

  return {
    isLoading,
    isLoadingVerifyPayment,
    isLoadingPaymentVerificationFailed,
    handlePayment,
    handleVerifyPayment,
    handlePaymentVerificationFailed,
    handleSendUserToPayku,
  };
};
