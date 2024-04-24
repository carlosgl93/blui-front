import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import RegistrarUsuarioController from './RegistrarUsuarioController';
import { formInputs } from './formInputs';
import useRecibeApoyo from '@/store/recibeApoyo';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';
import { CreateUserParams, useAuthNew } from '@/hooks/useAuthNew';
import { Link } from 'react-router-dom';
import { useComunas } from '@/hooks';
import SearchBar from '../RecibeApoyo/SearchBar';

function RegistrarUsuario() {
  const [{ forWhom }] = useRecibeApoyo();
  const { state, handleChange, handleSubmit } = RegistrarUsuarioController();
  const { selectedComunas } = useComunas();
  const [user] = useAuth();
  const theme = useTheme();

  const { createUser, createUserLoading } = useAuthNew();

  const resetPatientName = () => {
    const input = document.querySelector('input[name="nombrePaciente"]') as HTMLInputElement;
    console.log(input);
    if (input) {
      input.value = '';
    }
  };

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
        {/* <Box>
          <Image
            src="/images/blui-new.png"
            sx={{
              width: '100%',
              maxWidth: 125,
              height: 'auto',
            }}
          />
        </Box> */}
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
                <TextField
                  sx={{
                    m: {
                      xs: 2,
                      sm: 5,
                      md: 3,
                    },
                  }}
                  key={i}
                  label={'Nombre del paciente'}
                  name={'nombrePaciente'}
                  variant="outlined"
                  onChange={handleChange}
                  type={'text'}
                  value={state.nombrePaciente}
                  onClick={() => resetPatientName()}
                />
              );
            } else if (forWhom === 'paciente' && input.inputName === 'nombrePaciente') {
              return null;
            } else {
              return (
                <TextField
                  sx={{
                    m: {
                      xs: 2,
                      sm: 5,
                      md: 3,
                    },
                  }}
                  key={i}
                  label={input.label}
                  name={input.inputName}
                  variant="outlined"
                  placeholder={input.placeholder}
                  onChange={handleChange}
                  type={input.type}
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
                createUser({ ...(state as CreateUserParams) });
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
