import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButtonBox, StyledOutlinedInput, Wrapper } from '../styledBackOffice';
import Loading from '@/components/Loading';
import { PrestadoresGridController } from './PrestadoresGridController';
import { IconButton, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

export const Prestadores = () => {
  const {
    rows,
    columns,
    paginationModel,
    setPaginationModel,
    totalPrestadores,
    isLoadingPrestadores,
    isLoadingVerifyPrestador,
    isLoadingTotalPrestadores,
    isLoadingFailedVerifyPrestador,
  } = PrestadoresGridController();

  const isLoading =
    isLoadingFailedVerifyPrestador ||
    isLoadingTotalPrestadores ||
    isLoadingVerifyPrestador ||
    isLoadingPrestadores;

  if (rows && totalPrestadores)
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
              rows={rows}
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
