import { prestadoresGridPaginationModelState } from '@/store/backoffice/prestadores';
import { GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { Prestador } from '@/store/auth/prestador';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { failedVerifyPrestadorMutation, verifyPrestadorMutation } from '@/api/prestadores';

type PrestadoresRow = Prestador;

export const PrestadoresGridController = () => {
  const [paginationModel, setPaginationModel] = useRecoilState(prestadoresGridPaginationModelState);

  const { mutate: verifyPrestador, isLoading: isLoadingVerifyPrestador } =
    useMutation(verifyPrestadorMutation);

  const { mutate: failedVerifyPrestador, isLoading: isLoadingFailedVerifyPrestador } = useMutation(
    failedVerifyPrestadorMutation,
  );

  const columns = useMemo<GridColDef<PrestadoresRow>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'rut',
        valueGetter: (_value, row) => {
          return row.rut;
        },
        headerName: 'Rut',
        width: 150,
        editable: false,
      },
      {
        field: 'provider',
        valueGetter: (_value, row) => {
          return `${row.firstname} ${row.lastname}`;
        },
        headerName: 'Nombre',
        width: 150,
        editable: false,
      },
      {
        field: 'servicio',
        valueGetter: (_value, row) => {
          return row?.servicio;
        },
        headerName: 'Servicio',
        width: 200,
        editable: false,
      },
      {
        field: 'verified',
        valueGetter: (_value, row) => {
          return row?.verified;
        },
        headerName: 'Verificación',
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
        field: 'verifyPrestador',
        type: 'actions',
        headerName: 'Acciones',
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            key={params.id}
            icon={<CancelOutlinedIcon sx={{ color: 'red' }} />}
            label="No pagado"
            onClick={() => failedVerifyPrestador(params.row.id as string)}
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<DoneOutlinedIcon sx={{ color: 'green' }} />}
            label="Verificado"
            onClick={() => verifyPrestador(params.row.id as string)}
          />,
        ],
      },
    ],
    [failedVerifyPrestador, verifyPrestador],
  );

  return {
    columns,
    paginationModel,
    setPaginationModel,
    isLoadingVerifyPrestador,
    isLoadingFailedVerifyPrestador,
  };
};
