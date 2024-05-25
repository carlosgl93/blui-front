import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { ServicioController } from './ServicioController';
import { StyledText } from '../StyledConstruirPerfilComponents';
import { Box, IconButton, List, ListItem } from '@mui/material';
import { StyledSubtitle } from '../Comunas/StyledCompEditarComunas';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { UserCreatedServicio } from './types';
import { useAuthNew } from '@/hooks';
import Loading from '@/components/Loading';

export const ListServicios = () => {
  const {
    prestadorCreatedServicios,
    prestadorServicio,
    deleteServicioLoading,
    handleIsCreatingServicio,
    handleDeleteServicio,
  } = ServicioController();

  const { prestador } = useAuthNew();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <SubTitle sx={{ mb: 0 }}>Tus servicios</SubTitle>

        <IconButton onClick={handleIsCreatingServicio}>
          <AddOutlinedIcon
            sx={{
              fontSize: '2rem',
              color: 'primary.main',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </Box>

      <StyledText>Clasificación: {prestadorServicio?.serviceName}</StyledText>
      <StyledText>
        {prestadorCreatedServicios?.length === 1 ? 'Aun no tienes servicios creados' : ''}
      </StyledText>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          my: '1rem',
          width: {
            xs: '75vw',
            sm: '50vw',
            md: 'fit-content',
          },
        }}
      >
        <List>
          {deleteServicioLoading ? (
            <Loading />
          ) : (
            <>
              {prestadorCreatedServicios?.map((servicio: UserCreatedServicio) => (
                <ListItem
                  key={servicio.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box>
                    <StyledSubtitle sx={{ m: 0, color: 'primary.main' }}>
                      {servicio.name}
                    </StyledSubtitle>
                    <StyledText>Tarifa: {servicio.price}</StyledText>
                  </Box>
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleDeleteServicio(prestador?.id ?? '', servicio?.id ?? '')}
                    sx={{ color: 'red' }}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>
    </>
  );
};
