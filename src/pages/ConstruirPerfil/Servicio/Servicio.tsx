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
  const { isCreatingServicio, prestadorCreatedServiciosLoading, saveServicioLoading } =
    ServicioController();

  if (prestadorCreatedServiciosLoading || saveServicioLoading) {
    return (
      <Wrapper>
        <BackButton displayText />
        <Container>
          <StyledTitle>Servicios</StyledTitle>
          {(prestadorCreatedServiciosLoading || saveServicioLoading) && <Loading />}
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
