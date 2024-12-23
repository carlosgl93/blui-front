import { useNavigate } from 'react-router-dom';
import { ButtonCTA, DashboardTileContainer, StyledTitle, SubTitle } from '../StyledComponents';
import { Text } from '@/components/StyledComponents';

export const PublicarAyudaTile = () => {
  const router = useNavigate();

  const handleGoToProfile = () => {
    router(`/perfil-usuario`);
  };

  return (
    <DashboardTileContainer>
      <StyledTitle>Publicar apoyo</StyledTitle>
      <SubTitle>Publica tu necesidad particular</SubTitle>
      <Text>Hazte visible para que los prestadores te encuentren a tí.</Text>
      <ButtonCTA variant="contained" onClick={handleGoToProfile}>
        Publicar Apoyo
      </ButtonCTA>
    </DashboardTileContainer>
  );
};
