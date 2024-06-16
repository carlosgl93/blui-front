import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAppointments } from '@/hooks/useAppointments';
import { IconButtonBox, StyledOutlinedInput, Wrapper } from '../styledBackOffice';
import Loading from '@/components/Loading';
import { PaymentsGridController } from './PaymentsGridController';
import { IconButton, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

export const Pagos = () => {
  const {
    allAppointments,
    allAppointmentsLoading,
    getTotalAppointments,
    getTotalAppointmentsIsLoading,
  } = useAppointments();
  const {
    columns,
    isLoadingPaymentVerificationFailed,
    isLoadingVerifyPayment,
    paginationModel,
    setPaginationModel,
  } = PaymentsGridController();

  const isLoading =
    isLoadingPaymentVerificationFailed ||
    isLoadingVerifyPayment ||
    allAppointmentsLoading ||
    getTotalAppointmentsIsLoading;

  if (allAppointments)
    return (
      <Wrapper>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <StyledOutlinedInput
              id="searchPago"
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="buscar por comuna" edge="end">
                    <IconButtonBox>
                      <Search
                        sx={{
                          color: 'primary.main',
                        }}
                      />
                    </IconButtonBox>
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Buscar pago por ID"
              // onChange={onChangeHandler}
            />
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              columns={columns}
              rows={allAppointments}
              paginationMode="server"
              rowCount={getTotalAppointments?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25]}
            />
          </>
        )}
      </Wrapper>
    );
};
