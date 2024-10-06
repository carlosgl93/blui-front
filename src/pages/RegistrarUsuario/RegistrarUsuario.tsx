import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import RegistrarUsuarioController from './RegistrarUsuarioController';
import { formInputs } from './formInputs';
import useRecibeApoyo from '@/store/recibeApoyo';
import Loading from '@/components/Loading';
import { useAuthNew } from '@/hooks/useAuthNew';
import { Link } from 'react-router-dom';
import { useComunas } from '@/hooks';
import SearchBar from '../RecibeApoyo/SearchBar';
import { StyledInput } from './StyledInput';

function RegistrarUsuario() {
  const [{ forWhom }] = useRecibeApoyo();
  const { state, handleChange, handleSubmit, handleAcceptTerms } = RegistrarUsuarioController();
  const { selectedComunas } = useComunas();
  const theme = useTheme();

  const { createUserLoading, createUserError } = useAuthNew();

  if (createUserLoading) return <Loading />;

  const shouldDisable =
    state.nombre === '' ||
    state.apellido === '' ||
    state.correo === '' ||
    state.contrasena === '' ||
    state.confirmarContrasena === '' ||
    state.error !== '' ||
    state.rut === '' ||
    !state.acceptedTerms ||
    createUserLoading ||
    !!createUserError;

  return (
    <>
      <Meta title="Registrar usuario Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          textAlign: 'center',
          mb: '2rem',
          px: {
            xs: '1rem',
            md: 'auto',
          },
        }}
      >
        <TextContainer>
          <Title
            sx={{
              fontSize: '1.4rem',
              my: '1rem',
            }}
          >
            ¡Estas a un solo paso! Registrate para poder contactar a la persona que buscas.
          </Title>
        </TextContainer>
        <Box
          component={'form'}
          sx={{ gap: theme.spacing(1), display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: 'row',
            }}
          >
            <Text sx={{ fontSize: '0.8rem', width: '100%', textAlign: 'center' }}>
              Ya tienes una cuenta? {'  '}
              <Link to="/ingresar">Ingresa aqui</Link>
            </Text>
          </Box>
          {state.error && (
            <TextContainer>
              <Typography
                variant="body1"
                sx={{
                  color: 'red',
                }}
              >
                {state.error}
              </Typography>
            </TextContainer>
          )}
          {formInputs.map((input, i) => {
            if (!selectedComunas.length && input.inputName === 'comuna') {
              return <SearchBar key={i} />;
            } else if (forWhom === 'tercero' && input.inputName === 'nombrePaciente') {
              return (
                <StyledInput
                  key={i}
                  input={{
                    label: 'Nombre del paciente',
                    inputName: 'nombrePaciente',
                    placeholder: 'Nombre del paciente',
                    type: 'text',
                  }}
                  value={state.nombrePaciente}
                  handleChange={handleChange}
                />
              );
            } else if (forWhom === 'paciente' && input.inputName === 'nombrePaciente') {
              return null;
            } else {
              return (
                <StyledInput
                  key={i}
                  input={input}
                  handleChange={handleChange}
                  value={state[input?.inputName] as string}
                />
              );
            }
          })}
          {/* TODO: ADD CAPTCHA */}
          <FlexBox
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                maxWidth: '50%',
              }}
            >
              <span>
                Al crearte una cuenta, aceptas los{' '}
                <Link to="/terms-conditions">términos y condiciones</Link> de Blui.{' '}
              </span>
            </Box>
            <Box>
              <Checkbox
                checked={!!state.acceptedTerms}
                onChange={handleAcceptTerms}
                name="acceptedTerms"
              />
            </Box>
          </FlexBox>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {createUserError && (
              <Box>
                <Text
                  sx={{
                    color: 'red',
                  }}
                >
                  Hubo un error al crear tu cuenta. {createUserError.message}
                </Text>
              </Box>
            )}
            <Button
              disabled={shouldDisable}
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: '2.5vh',
              }}
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default RegistrarUsuario;
