import BackButton from '@/components/BackButton';
import {
  Container,
  StyledTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { ServicioController } from './ServicioController';
import { CreateServicio } from './CreateServicio';
import Loading from '@/components/Loading';
import { ListServicios } from './ListServicios';

export const Servicio = () => {
  const { isCreatingServicio, prestadorCreatedServiciosLoading } = ServicioController();

  if (prestadorCreatedServiciosLoading) {
    return (
      <Wrapper>
        <BackButton displayText />
        <Container>
          <StyledTitle>Servicios</StyledTitle>
          {prestadorCreatedServiciosLoading && <Loading />}
        </Container>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <BackButton displayText />
      <Container>
        <StyledTitle>Servicios</StyledTitle>
        {isCreatingServicio ? <CreateServicio /> : <ListServicios />}
      </Container>
    </Wrapper>
  );
};
