import { Box, Button, List } from '@mui/material';
import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '../PrestadorDashboard/StyledPrestadorDashboardComponents';
import { construirPerfilOpciones } from './construirPerfilOpciones';
import {
  StyledCheckedIcon,
  StyledLink,
  StyledListItem,
  StyledOption,
  StyledText,
  StyledUncheckedIcon,
} from './StyledConstruirPerfilComponents';
import BackButton from '@/components/BackButton';
import useConstruirPerfil from '@/store/construirPerfil';
import Loading from '@/components/Loading';
import { useConstruirPerfilNew } from '@/hooks/useConstruirPerfilNew';

export const ConstruirPerfil = () => {
  const [construirPerfil, { handleVerPerfil }] = useConstruirPerfil();
  const { settings } = useConstruirPerfilNew();

  return (
    <Wrapper>
      <BackButton to="/prestador-dashboard" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '1rem',
        }}
      >
        <StyledTitle>Mi perfil</StyledTitle>
        <Button variant="contained" onClick={handleVerPerfil}>
          Ver perfil
        </Button>
      </Box>
      <Container>
        {construirPerfil.loading ? (
          <Loading />
        ) : (
          <>
            <SubTitle>Pasos a completar</SubTitle>
            <StyledText>
              No todos son necesarios, pero aumentan las probabilidades de que los clientes te
              contacten.
            </StyledText>
            <List>
              {construirPerfilOpciones.map((opcion) => {
                const { key, value } = opcion;
                return (
                  <StyledLink key={opcion.key} to={`/construir-perfil/${opcion.key}`}>
                    <StyledListItem>
                      {settings?.[key] ? <StyledCheckedIcon /> : <StyledUncheckedIcon />}
                      <StyledOption>{value}</StyledOption>
                    </StyledListItem>
                  </StyledLink>
                );
              })}
            </List>
          </>
        )}
      </Container>
    </Wrapper>
  );
};
