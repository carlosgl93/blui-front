import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import BackButton from '@/components/BackButton';
import { StyledText } from '../StyledConstruirPerfilComponents';
import { Box, Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListAvailableDays } from './ListAvailableDays';
import { EditAvailableDays } from './EditAvailableDays';
import { useDisponibilidadNew } from '@/hooks/useDisponibilidadNew';
import Loading from '@/components/Loading';

export const Disponibilidad = () => {
  const { availability, isLoading, editDisponibilidad, handleEditDisponibilidad } =
    useDisponibilidadNew();

  return (
    <Wrapper>
      <BackButton action={editDisponibilidad ? handleEditDisponibilidad : undefined} />
      <Container>
        <StyledTitle>Disponibilidad</StyledTitle>
        <SubTitle>Dias y horas disponible</SubTitle>
        <StyledText>
          Agrega que dias y horas estas disponible para que te lleguen solicitudes que te acomoden.
        </StyledText>
        <Box
          sx={{
            my: '1rem',
            mx: 'auto',
            width: {
              xs: '75vw',
              sm: '50vw',
              md: 'fit-content',
            },
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={handleEditDisponibilidad}
            sx={{ fontWeight: 'bold' }}
          >
            {editDisponibilidad ? 'Editando' : 'Editar'}
          </Button>
        </Box>
        {isLoading ? (
          <Loading />
        ) : !editDisponibilidad ? (
          <ListAvailableDays availability={availability} />
        ) : (
          <EditAvailableDays availability={availability} />
        )}
      </Container>
    </Wrapper>
  );
};
