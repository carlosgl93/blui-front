import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import RegistrarUsuarioController from './RegistrarUsuarioController';
import { formInputs } from './formInputs';
import useRecibeApoyo from '@/store/recibeApoyo';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';
import { useAuthNew } from '@/hooks/useAuthNew';
import { Link } from 'react-router-dom';
import { useComunas } from '@/hooks';
import SearchBar from '../RecibeApoyo/SearchBar';
import { CreateUserParams } from '@/api/auth';
import { StyledInput } from './StyledInput';

function RegistrarUsuario() {
  const [{ forWhom }] = useRecibeApoyo();
  const { state, handleChange, handleSubmit } = RegistrarUsuarioController();
  const { selectedComunas } = useComunas();
  const [user] = useAuth();
  const theme = useTheme();

  const { createUser, createUserLoading } = useAuthNew();

  if (user.loading) return <Loading />;

  return (
    <>
      <Meta title="Registrar usuario Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          maxWidth: 500,
          textAlign: 'center',
          mb: '2rem',
        }}
      >
        <TextContainer>
          <Title
            sx={{
              fontSize: '1.4rem',
              my: '2.5vh',
            }}
          >
            ¡Estas a un solo paso! Registrate para poder contactar a la persona que buscas.
          </Title>
        </TextContainer>
        <Box
          component={'form'}
          sx={{ width: '100%', gap: theme.spacing(2) }}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {user.error && (
              <Box>
                <Text
                  sx={{
                    color: 'red',
                  }}
                >
                  {user.error}
                </Text>
              </Box>
            )}
            <Button
              disabled={
                state.nombre === '' ||
                state.apellido === '' ||
                state.correo === '' ||
                state.contrasena === '' ||
                state.confirmarContrasena === '' ||
                state.error !== '' ||
                state.rut === '' ||
                createUserLoading
              }
              variant="contained"
              onClick={() => {
                const userParams = {
                  ...state,
                  paraQuien: forWhom,
                  comunas: selectedComunas,
                };
                createUser(userParams as CreateUserParams);
              }}
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
