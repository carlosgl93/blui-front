import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { TextContainer, Title } from '@/components/StyledComponents';
import RegistrarPrestadorController from './RegistrarPrestadorController';
import { formInputs } from './formInputs';
import { useAuthNew } from '@/hooks/useAuthNew';

function RegistrarPrestador() {
  const { state, handleChange, handleSubmit } = RegistrarPrestadorController();
  const { createPrestadorLoading } = useAuthNew();
  const theme = useTheme();
  return (
    <>
      <Meta title="Registrar prestador de servicio Blui" />
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
            ¡Estas a un solo paso! Registrate para poder ofrecer tus servicios.
          </Title>
        </TextContainer>
        <Box
          component={'form'}
          sx={{ width: '100%', gap: theme.spacing(2) }}
          onSubmit={handleSubmit}
        >
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
          {formInputs.map((input) => {
            return (
              <TextField
                sx={{
                  m: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                  },
                }}
                key={input.inputName}
                label={input.label}
                name={input.inputName}
                variant="outlined"
                placeholder={input.placeholder}
                onChange={handleChange}
                type={input.type}
                helperText={input?.helperText ?? ''}
              />
            );
            // }
          })}
          {/* TODO: ADD CAPTCHA */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button
              disabled={
                // state.nombre === '' ||
                // state.apellido === '' ||
                // state.telefono === '' ||
                state.correo === '' ||
                state.contrasena === '' ||
                state.confirmarContrasena === '' ||
                state.error !== '' ||
                createPrestadorLoading
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: '5vh',
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default RegistrarPrestador;
