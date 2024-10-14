import { useMemo } from 'react';
import { GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import { AppointmentParams } from '@/api/appointments';
import dayjs from 'dayjs';
import { formatCLP } from '@/utils/formatCLP';
import { PaymentController } from '@/pages/Sesiones/PaymentController';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  paymentDetailsParamsState,
  paymentsGridPaginationModelState,
  showPaymentsDetailsState,
} from '@/store/backoffice/payments';
import { paymentSettings } from '@/config';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProviderBankDetails, notifyMissingBankDetails } from '@/api/cuentaBancaria';
import { markAsPaid } from '@/api/payments';
import { notificationState } from '@/store/snackbar';

export interface PaymentRecord extends AppointmentParams {
  amountToPay: number;
  appointmentId: string;
  paymentStatus: string;
}
type PaymentsRow = PaymentRecord;

export const PaymentsGridController = () => {
  const [paginationModel, setPaginationModel] = useRecoilState(paymentsGridPaginationModelState);
  const [showPaymentsDetails, setShowPaymentsDetails] = useRecoilState(showPaymentsDetailsState);
  const [paymentDetailsParams, setPaymentDetailsParams] = useRecoilState(paymentDetailsParamsState);
  const setNotification = useSetRecoilState(notificationState);
  const client = useQueryClient();

  const {
    handleVerifyPayment,
    handlePaymentVerificationFailed,
    isLoadingVerifyPayment,
    isLoadingPaymentVerificationFailed,
    duePayments,
    duePaymentsIsLoading,
  } = PaymentController();

  const columns = useMemo<GridColDef<PaymentsRow>[]>(
    () => [
      { field: 'appointmentId', headerName: 'ID', width: 90 },
      {
        field: 'provider',
        valueGetter: (_value, row) => {
          return `${row?.provider.firstname} ${row?.provider.lastname}`;
        },
        headerName: 'Prestador',
        width: 150,
        editable: false,
      },
      {
        field: 'customer',
        valueGetter: (_value, row) => {
          return `${row.customer.firstname} ${row?.provider.lastname}`;
        },
        headerName: 'Cliente',
        width: 150,
        editable: false,
      },
      {
        field: 'servicePrice',
        valueGetter: (_value, row) => {
          return formatCLP(row.servicio.price);
        },
        headerName: 'Precio',
        width: 100,
        editable: false,
      },
      {
        field: 'platformFee',
        valueGetter: (_value, row) => {
          return formatCLP(+row.servicio.price * (paymentSettings.appCommission - 1));
        },
        headerName: 'Comisión Blui',
        width: 100,
        editable: false,
      },
      {
        field: 'to pay',
        headerName: 'Monto a pagar',
        valueGetter: (_value, row) => {
          return formatCLP(row.amountToPay);
        },
        width: 100,
        editable: false,
      },
      {
        field: 'isPaid',
        headerName: 'Estado de pago',
        valueGetter: (_value, row) => {
          if (row.isPaid === false) {
            return 'No pagado';
          }
          return row.isPaid;
        },
        width: 150,
        editable: false,
      },
      {
        field: 'scheduledDate',
        headerName: 'Fecha Sesión',
        valueGetter: (_value, row) => {
          return dayjs(`${row.scheduledDate}${row.scheduledTime}`).format('DD/MM/YYYY HH:mm');
        },
        width: 150,
        editable: false,
      },
      {
        field: 'verifyPayment',
        type: 'actions',
        headerName: 'Acciones',
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            key={params.row?.id}
            icon={<InfoIcon />}
            label="No pagado"
            onClick={() => handleOpenPaymentDetails(params.row)}
          />,
          // <GridActionsCellItem
          //   key={params.id}
          //   icon={<CancelOutlinedIcon sx={{ color: 'red' }} />}
          //   label="No pagado"
          //   onClick={() => handlePaymentVerificationFailed(params.row.id as string)}
          // />,
          // <GridActionsCellItem
          //   key={params.id}
          //   icon={<DoneOutlinedIcon sx={{ color: 'green' }} />}
          //   label="Verificado"
          //   onClick={() => handleVerifyPayment(params.row.id as string)}
          // />,
        ],
      },
    ],
    [handlePaymentVerificationFailed, handleVerifyPayment],
  );

  const { data: providerBankDetails, isLoading: providerBankDetailsIsLoading } = useQuery(
    ['providerBankDetails', paymentDetailsParams?.provider?.id],
    () => getProviderBankDetails(paymentDetailsParams?.provider?.id),
    {
      enabled: !!paymentDetailsParams?.provider?.id,
    },
  );

  const { mutate: markAsPaidMutation, isLoading: markAsPaidIsLoading } = useMutation(markAsPaid, {
    onSuccess() {
      setNotification({
        open: true,
        message: 'Pago marcado como pagado',
        severity: 'success',
      });
      setShowPaymentsDetails(!showPaymentsDetails);
      // invalidate query
      client.invalidateQueries(['duePaymentsQuery']);
    },
    onError() {
      setNotification({
        open: true,
        message: 'Hubo un error, intentalo nuevamente',
        severity: 'error',
      });
    },
  });

  const { mutate: notifyMissingBankDetailsMutation, isLoading: notifyMissingBankDetailsIsLoading } =
    useMutation('notifyMissingBankDetails', notifyMissingBankDetails, {
      onSuccess() {
        setNotification({
          open: true,
          message: 'Prestador notificado',
          severity: 'success',
        });
      },
      onError() {
        setNotification({
          open: true,
          message: 'Hubo un error, intentalo nuevamente',
          severity: 'error',
        });
      },
    });
  const handleOpenPaymentDetails = async (params: PaymentRecord) => {
    setPaymentDetailsParams(params);
    setShowPaymentsDetails(!showPaymentsDetails);
  };

  const handleMarkAsPaid = (id: string | undefined) => {
    markAsPaidMutation(id);
  };

  return {
    columns,
    paginationModel,
    isLoadingPaymentVerificationFailed,
    isLoadingVerifyPayment,
    duePayments,
    duePaymentsIsLoading,
    showPaymentsDetails,
    paymentDetailsParams,
    providerBankDetails,
    providerBankDetailsIsLoading,
    markAsPaidIsLoading,
    notifyMissingBankDetailsIsLoading,
    setPaginationModel,
    handleOpenPaymentDetails,
    handleMarkAsPaid,
    notifyMissingBankDetailsMutation,
  };
};
