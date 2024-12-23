import { useNavigate } from 'react-router-dom';
import { ButtonCTA, DashboardTileContainer, StyledTitle, SubTitle } from '../StyledComponents';
import { Text } from '@/components/StyledComponents';

export const PublicarAyudaTile = () => {
  const router = useNavigate();

  const handleGoToPostSupport = () => {
    router(`/post-support`);
  };

  return (
    <DashboardTileContainer>
      <StyledTitle>Publicar apoyo</StyledTitle>
      <SubTitle>Publica tu necesidad particular</SubTitle>
      <Text>Hazte visible para que los prestadores te encuentren a tí.</Text>
      <ButtonCTA variant="contained" onClick={handleGoToPostSupport}>
        Publicar Apoyo
      </ButtonCTA>
    </DashboardTileContainer>
  );
};
