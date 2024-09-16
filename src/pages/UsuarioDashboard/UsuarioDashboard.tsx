import { Box } from '@mui/material';
import { EncuentraApoyo } from './EncuentraApoyo';
import { ActualizarPerfil } from './ActualizarPerfil';

export const UsuarioDashboard = () => {
  return (
    <Box
      sx={{
        p: '1rem',
        width: {
          xs: '100%',
          sm: '100%',
          md: '50%',
        },
        mx: 'auto',
      }}
    >
      <ActualizarPerfil />
      <EncuentraApoyo />
    </Box>
  );
};
