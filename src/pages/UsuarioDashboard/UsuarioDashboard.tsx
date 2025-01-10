import { Box } from '@mui/material';
import { EncuentraApoyo } from './EncuentraApoyo';
import { ActualizarPerfil } from './ActualizarPerfil';
import { SesionesDashboardTile } from './SesionesDashboardTile';
import { AdministrarApoyosTile } from '../Apoyo/PublicarAyuda';

export const UsuarioDashboard = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr',
          lg: '1fr 1fr 1fr',
        },
        gridTemplateRows: {
          xs: '1fr 1fr 1fr',
          sm: '1fr 1fr 1fr',
          md: '0.5fr',
          lg: '0.5fr',
        },
        gap: '3rem',
        p: '1rem',
        borderRadius: '1rem',
        minHeight: '75vh',
      }}
    >
      <ActualizarPerfil />
      <AdministrarApoyosTile />
      <EncuentraApoyo />
      <SesionesDashboardTile />
    </Box>
  );
};
