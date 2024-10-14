import { Text } from '@/components/StyledComponents';
import { useNavigate } from 'react-router-dom';
import { ButtonCTA, DashboardTileContainer, StyledTitle, SubTitle } from './StyledComponents';

export const SesionesDashboardTile = () => {
  const router = useNavigate();

  const handleBuscarPrestadores = () => {
    router('/sesiones');
  };

  return (
    <DashboardTileContainer>
      <StyledTitle>Sesiones</StyledTitle>
      <SubTitle>Revisa tus futuras y pasadas sesiones.</SubTitle>
      <Text>
        Puedes revisar la información de tus sesiones. Si tienes alguna pendiente puedes reanudar el
        pago.
      </Text>
      <ButtonCTA variant="contained" onClick={handleBuscarPrestadores}>
        Ver sesiones
      </ButtonCTA>
    </DashboardTileContainer>
  );
};
