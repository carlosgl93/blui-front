import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Box, Button, Checkbox, TextField, Typography, useTheme } from '@mui/material';
import { TextContainer, Title } from '@/components/StyledComponents';
import RegistrarPrestadorController from './RegistrarPrestadorController';
import { formInputs } from './formInputs';
import { useAuthNew } from '@/hooks/useAuthNew';
import { Link } from 'react-router-dom';

function RegistrarPrestador() {
  const { state, handleChange, handleSubmit, handleAcceptTerms } = RegistrarPrestadorController();
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

          <FlexBox
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '2rem',
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
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button
              disabled={
                // state.nombre === '' ||
                // state.apellido === '' ||
                // state.telefono === '' ||
                !state.acceptedTerms ||
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
