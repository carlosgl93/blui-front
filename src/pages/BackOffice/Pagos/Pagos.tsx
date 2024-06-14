import { DataGrid } from '@mui/x-data-grid';
import { useAppointments } from '@/hooks/useAppointments';
import { Wrapper } from '../styledBackOffice';
import Loading from '@/components/Loading';
import { PaymentsGridController } from './PaymentsGridController';

export const Pagos = () => {
  const { allAppointments, allAppointmentsLoading } = useAppointments();
  const { columns, isLoadingPaymentVerificationFailed, isLoadingVerifyPayment } =
    PaymentsGridController();

  const isLoading =
    isLoadingPaymentVerificationFailed || isLoadingVerifyPayment || allAppointmentsLoading;

  if (allAppointments)
    return (
      <Wrapper>
        {isLoading ? <Loading /> : <DataGrid columns={columns} rows={allAppointments} />}
      </Wrapper>
    );
};
