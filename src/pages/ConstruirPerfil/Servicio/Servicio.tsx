import BackButton from '@/components/BackButton';
import {
  BackButtonContainer,
  Container,
  StyledTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { ServicioController } from './ServicioController';
import { CreateServicio } from './CreateServicio';
import Loading from '@/components/Loading';
import { ListServicios } from './ListServicios';

export const Servicio = () => {
  const { isCreatingServicio, prestadorCreatedServiciosLoading, saveServicioLoading } =
    ServicioController();

  if (prestadorCreatedServiciosLoading || saveServicioLoading) return <Loading />;

  return (
    <Wrapper>
      <BackButtonContainer>
        <BackButton displayText to="/construir-perfil" />
      </BackButtonContainer>
      <StyledTitle>Servicios</StyledTitle>
      <Container
        sx={{
          minHeight: '50vh',
          minWidth: '50vw',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        {isCreatingServicio ? <CreateServicio /> : <ListServicios />}
      </Container>
    </Wrapper>
  );
};
