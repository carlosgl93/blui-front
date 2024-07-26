import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: 'white', p: '2rem', borderRadius: '1rem', px: '10%' }}>
      <Typography variant="body1">Blui © 2024</Typography>
      <Typography variant="body1" color="#232323">
        Cuidándonos En Comunidad
      </Typography>
    </Box>
  );
}
export default Footer;
