import { useMemo } from 'react';
import { GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { ScheduleServiceParams } from '@/api/appointments';
import dayjs from 'dayjs';
import { formatCLP } from '@/utils/formatCLP';
import { PaymentController } from '@/pages/Sesiones/PaymentController';
import { useRecoilState } from 'recoil';
import { paymentsGridPaginationModelState } from '@/store/payments';

type PaymentsRow = ScheduleServiceParams;

export const PaymentsGridController = () => {
  const [paginationModel, setPaginationModel] = useRecoilState(paymentsGridPaginationModelState);

  const {
    handleVerifyPayment,
    isLoadingVerifyPayment,
    handlePaymentVerificationFailed,
    isLoadingPaymentVerificationFailed,
  } = PaymentController();

  const columns = useMemo<GridColDef<PaymentsRow>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'provider',
        valueGetter: (_value, row) => {
          return `${row.provider.firstname} ${row.provider.lastname}`;
        },
        headerName: 'Prestador',
        width: 150,
        editable: false,
      },
      {
        field: 'customer',
        valueGetter: (_value, row) => {
          return `${row.customer.firstname} ${row.provider.lastname}`;
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
          return formatCLP(+row.servicio.price * 0.035);
        },
        headerName: 'Comisión Blui',
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
        field: 'createdAt',
        headerName: 'Fecha de creación',
        valueGetter: (_value, row) => {
          return dayjs(`${row.createdAt}`).format('DD/MM/YYYY HH:mm');
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
            key={params.id}
            icon={<CancelOutlinedIcon sx={{ color: 'red' }} />}
            label="No pagado"
            onClick={() => handlePaymentVerificationFailed(params.row.id as string)}
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<DoneOutlinedIcon sx={{ color: 'green' }} />}
            label="Verificado"
            onClick={() => handleVerifyPayment(params.row.id as string)}
          />,
        ],
      },
    ],
    [handlePaymentVerificationFailed, handleVerifyPayment],
  );

  return {
    columns,
    paginationModel,
    isLoadingPaymentVerificationFailed,
    isLoadingVerifyPayment,
    setPaginationModel,
  };
};
