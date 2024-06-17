import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButtonBox, StyledOutlinedInput, Wrapper } from '../styledBackOffice';
import Loading from '@/components/Loading';
import { PrestadoresGridController } from './PrestadoresGridController';
import { IconButton, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';

export const Prestadores = () => {
  const {
    data,
    isLoading: isLoadingPrestadores,
    totalPrestadores,
    isLoadingTotalPrestadores,
  } = useGetPrestadores();
  const {
    columns,
    isLoadingFailedVerifyPrestador,
    isLoadingVerifyPrestador,
    paginationModel,
    setPaginationModel,
  } = PrestadoresGridController();

  const isLoading =
    isLoadingFailedVerifyPrestador ||
    isLoadingTotalPrestadores ||
    isLoadingVerifyPrestador ||
    isLoadingPrestadores;

  if (data && totalPrestadores)
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
              placeholder="Buscar prestador por ID"
              // onChange={onChangeHandler}
            />
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              columns={columns}
              rows={data}
              paginationMode="server"
              rowCount={totalPrestadores?.count || 0}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25]}
            />
          </>
        )}
      </Wrapper>
    );
};
