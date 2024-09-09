import { Text } from '@/components/StyledComponents';
import {
  Container,
  StyledButton,
  StyledList,
  StyledTitle,
  Wrapper,
} from './StyledPrestadorDashboardComponents';
import { usePrestadorDashboard } from './usePrestadorDashboard';
import { FlexBox } from '@/components/styled';

export const PrestadorDashboard = () => {
  const { handleConstruirPerfil } = usePrestadorDashboard();

  return (
    <Wrapper>
      <Container>
        <StyledTitle>Construyamos tu perfil</StyledTitle>
        <Text>Construyamos un perfil ganador. Esta es tu oportunidad de:</Text>
        <StyledList>
          <li>
            <Text>Destacar tus habilidades y experiencia.</Text>
          </li>
          <li>
            <Text>Establecer valores competitivos y disponibilidad.</Text>
          </li>
          <li>
            <Text>Resaltar para los clientes al agregar tu experiencia e intereses.</Text>
          </li>
        </StyledList>
        <FlexBox
          sx={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <StyledButton variant="contained" onClick={handleConstruirPerfil}>
            Construir perfil
          </StyledButton>
        </FlexBox>
      </Container>
    </Wrapper>
  );
};
