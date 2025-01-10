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
import { IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const PrestadorDashboard = () => {
  const {
    handleConstruirPerfil,
    handleSesiones,
    handleEncuentraClientes,
    shouldDisableEncuentraClientes,
  } = usePrestadorDashboard();

  return (
    <Wrapper sx={wrapperSx}>
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
      <Container
        sx={{
          justifyContent: 'space-around',
        }}
      >
        <StyledTitle>Encuentra clientes</StyledTitle>
        <Text>Aquí puedes ver quien esta buscando tus servicios</Text>
        <FlexBox
          sx={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <StyledButton
            variant="contained"
            onClick={handleEncuentraClientes}
            disabled={shouldDisableEncuentraClientes}
          >
            Buscar clientes
          </StyledButton>
          {shouldDisableEncuentraClientes && (
            <Tooltip
              title="Completa tu perfil"
              enterTouchDelay={0}
              sx={{
                ':hover': {
                  backgroundColor: 'transparent',
                },
              }}
              arrow
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -25],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton>
                <HelpOutlineIcon
                  sx={{
                    color: 'secondary.contrastText',
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </FlexBox>
      </Container>
      <Container>
        <StyledTitle>Sesiones</StyledTitle>
        <Text>Organiza, chatea y confirma tus sesiones aquí</Text>
        <StyledList>
          <li>
            <Text>Revisa fechas, horarios y clientes</Text>
          </li>
          <li>
            <Text>Chatea con tus clientes.</Text>
          </li>
          <li>
            <Text>Confirma la realización de la sesión para recibir el pago.</Text>
          </li>
        </StyledList>
        <FlexBox
          sx={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <StyledButton variant="contained" onClick={handleSesiones}>
            Ver sesiones
          </StyledButton>
        </FlexBox>
      </Container>
    </Wrapper>
  );
};

const wrapperSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: '1fr 1fr',
    md: '1fr 1fr',
    lg: '1fr 1fr 1fr',
  },
  gridTemplateRows: {
    xs: 'auto',
    sm: '1fr 1fr 1fr',
    md: '0.5fr 0.5fr',
    lg: '0.5fr 0.5fr',
  },
  gap: '1rem',
  p: '1rem',
  borderRadius: '1rem',
  minHeight: '75vh',
  width: '100%',
};
