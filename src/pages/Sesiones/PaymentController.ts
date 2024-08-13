import { createTransaction } from '@/api/payments/createTransaction';
import { useMutation, useQueryClient } from 'react-query';
import { notificationState } from '@/store/snackbar';
import { useSetRecoilState } from 'recoil';
import { useAuthNew } from '@/hooks';
import {
  paymentVerificationFailedMutation,
  savePaymentMutation,
  ScheduleServiceParams,
  verifyPaymentMutation,
} from '@/api/appointments';
import axios from 'axios';

export const PaymentController = (appointment?: ScheduleServiceParams) => {
  const setNotification = useSetRecoilState(notificationState);
  const client = useQueryClient();
  const { user } = useAuthNew();

  const handleSendUserToPayku = async () => {
    console.log(appointment);
    const paykuRes = await createTransaction(appointment);
    // const paykuRes = await paykuApi.post('/transaction', {
    //   email: appointment?.customer?.email,
    //   order: uuidv4(),
    //   subject: 'Initiating payment',
    //   // amount: Number(
    //   //   formatCLP(appointment?.servicio?.price ? +appointment?.servicio?.price * 1.05 : 999999999),
    //   // ),
    //   amount: appointment?.servicio?.price ? +appointment?.servicio?.price * 1.05 : 999999999,
    //   currency: 'CLP',
    //   payment: 99,
    //   urlreturn: `https://blui.cl/successful-payment?appointmentId=${appointment?.id}`,
    //   urlnotify: 'https://blui.cl/transaction-result-function-serverless-email-notification',
    //   additional_parameters: {
    //     username: user?.firstname,
    //     prestadorname: appointment?.provider.firstname,
    //   },
    // });

    window.location.href = paykuRes.data.url;
  };

  const { mutate: savePayment, isLoading } = useMutation(savePaymentMutation, {
    onSuccess: () => {
      axios.post('https://sendEmail-3qwroszdxa-tl.a.run.app', {
        body: {
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
