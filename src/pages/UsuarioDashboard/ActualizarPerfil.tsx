import { Text } from '@/components/StyledComponents';
import { useNavigate } from 'react-router-dom';
import { ButtonCTA, DashboardTileContainer, StyledTitle, SubTitle } from './StyledComponents';

export const ActualizarPerfil = () => {
  const router = useNavigate();

  const handleGoToProfile = () => {
    router(`/perfil-usuario`);
  };

  return (
    <DashboardTileContainer>
      <StyledTitle>Actualizar perfil</StyledTitle>
      <SubTitle>Comparte tus necesidades de apoyo.</SubTitle>
      <Text>
        Agrega o actualiza tus necesidades medicas, sociales para informar a los prestadores.
      </Text>
      <ButtonCTA variant="contained" onClick={handleGoToProfile}>
        Ir al perfil
      </ButtonCTA>
    </DashboardTileContainer>
  );
};
