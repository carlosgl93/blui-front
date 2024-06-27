import { prestadoresGridPaginationModelState } from '@/store/backoffice/prestadores';
import { GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { Prestador } from '@/store/auth/prestador';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { failedVerifyPrestadorMutation, verifyPrestadorMutation } from '@/api/prestadores';
import { notificationState } from '@/store/snackbar';
import axios from 'axios';
import { interactedPrestadorState } from '../../../store/resultados/interactedPrestador';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';
import { useAuthNew } from '@/hooks';

type PrestadoresRow = Prestador;

export const PrestadoresGridController = () => {
  const [paginationModel, setPaginationModel] = useRecoilState(prestadoresGridPaginationModelState);
  const setNotification = useSetRecoilState(notificationState);
  const [interactedPrestador, setInteractedPrestador] = useRecoilState(interactedPrestadorState);
  const client = useQueryClient();
  const { user } = useAuthNew();

  const {
    data: prestadores,
    isLoading: isLoadingPrestadores,
    totalPrestadores,
    isLoadingTotalPrestadores,
  } = useGetPrestadores();

  console.log(prestadores);
  console.log(interactedPrestador);

  const { mutate: verifyPrestador, isLoading: isLoadingVerifyPrestador } = useMutation(
    verifyPrestadorMutation,
    {
      onSuccess: () => {
        console.log('interactedPrestador', interactedPrestador);
        client.invalidateQueries(['prestadoresByComunaAndServicio']);
        setNotification({
          open: true,
          message: 'Prestador confirmado',
          severity: 'success',
        });
        axios.post('https://sendemail-3qwroszdxa-tl.a.run.app', {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
          body: {
            options: {
              from: 'Francisco Durney <francisco.durney@blui.cl>',
              to: interactedPrestador?.email,
              subject: 'Tu perfil ha sido verificado!',
              text: `Estimado ${
                interactedPrestador?.firstname
                  ? interactedPrestador.firstname
                  : interactedPrestador?.email
              } hemos verificado tu perfil.`,
              html: `<p>Estimado ${
                interactedPrestador?.firstname
                  ? interactedPrestador.firstname
                  : interactedPrestador?.email
              } hemos verificado tu perfil.</p>`,
            },
          },
        });
      },
    },
  );

  const { mutate: failedVerifyPrestador, isLoading: isLoadingFailedVerifyPrestador } = useMutation(
    failedVerifyPrestadorMutation,
    {
      onSuccess: () => {
        client.invalidateQueries(['prestadoresByComunaAndServicio']);
        setNotification({
          open: true,
          message: 'Prestador rechazado',
          severity: 'success',
        });
        axios.post('http://localhost:5001/blui-6ec33/us-central1/sendEmail', {
          body: {
            options: {
              from: 'Francisco Durney <francisco.durney@blui.cl>',
              to: interactedPrestador?.email,
              subject: 'Tu perfil ha sido rechazado!',
              text: `Estimado ${
                interactedPrestador?.firstname
                  ? interactedPrestador.firstname
                  : interactedPrestador?.email
              } hemos rechazado tu perfil dado que no figuras en la base de datos de prestadores de salud de chile.`,
              html: `<p>Estimado ${
                interactedPrestador?.firstname
                  ? interactedPrestador.firstname
                  : interactedPrestador?.email
              } hemos rechazado tu perfil dado que no figuras en la base de datos de prestadores de salud de chile.</p>`,
            },
          },
        });
      },
    },
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
            label="Rechazar"
            onClick={() => {
              console.log('id from row', params.row.id);
              handleFailedVerifyPrestador(params.row.id as string);
            }}
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<DoneOutlinedIcon sx={{ color: 'green' }} />}
            label="Verificado"
            onClick={() => handleVerifyPrestador(params.row.id as string)}
          />,
        ],
      },
    ],
    [failedVerifyPrestador, verifyPrestador],
  );

  const handleVerifyPrestador = (prestadorId: string) => {
    console.log('inside handle verify');
    const foundPrestador: Prestador | undefined = prestadores?.find((p) => {
      console.log('id from array', p.id);
      console.log('id from params', prestadorId);

      return p.id.trim() === prestadorId.trim();
    });
    setInteractedPrestador(() => (foundPrestador ? foundPrestador : null));
    verifyPrestador(prestadorId);
    console.log(prestadorId);
  };

  const handleFailedVerifyPrestador = (prestadorId: string) => {
    setInteractedPrestador(prestadores?.find((p) => p.id === prestadorId) ?? null);
    failedVerifyPrestador(prestadorId);
  };

  return {
    columns,
    paginationModel,
    totalPrestadores,
    rows: prestadores,
    setPaginationModel,
    isLoadingPrestadores,
    isLoadingVerifyPrestador,
    isLoadingTotalPrestadores,
    isLoadingFailedVerifyPrestador,
  };
};
