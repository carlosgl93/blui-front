import { Box, Typography, useTheme } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Text } from './StyledComponents';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';

const content = [
  {
    icon: (
      <PeopleAltOutlinedIcon
        sx={{
          fontSize: '3rem',
        }}
      />
    ),
    title: 'Libertad de elección',
    text: 'Con Blui tendrás la libertad de elegir tu propio equipo de apoyo y diseñar un programa a tu medida, según tus necesidades, intereses y presupuesto.',
  },
  {
    icon: (
      <FavoriteBorderOutlinedIcon
        sx={{
          fontSize: '3rem',
        }}
      />
    ),
    title: 'Tranquilidad y confianza',
    text: 'Con Blui puedes tener la tranquilidad y confianza que cada trabajador independiente que ofrezca servicios en nuestra comunidad ha sido sujeto a un exhaustivo control, basado en la verificación de su información personal y profesional, de manera de asegurarnos que la experiencia de los usuarios de Blui sea satisfactoria y por sobre todo segura.',
  },
  {
    icon: (
      <ReviewsOutlinedIcon
        sx={{
          fontSize: '3rem',
        }}
      />
    ),
    title: 'Calificaciones y comentarios',
    text: 'En cada perfil de trabajadores independientes que encuentres podrás ver las distintas calificaciones y comentarios que otros miembros de la comunidad Blui hayan dejado en base a sus propias experiencias.',
  },
];

function CommunityAdvantages() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        justifyContent: 'space-between',
        alignItems: 'center',
        p: {
          xs: '1rem',
          sm: '2rem',
        },
      }}
    >
      <Box sx={{ mb: { xs: '2rem', sm: 0 } }}>
        <Typography
          variant="h4"
          sx={{
            mb: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            color: theme.palette.primary.dark,
          }}
        >
          Descubre las ventajas de pertenecer a la comunidad Blui
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            justifyContent: 'space-between',
            alignItems: {
              xs: 'center',
              sm: 'flex-start',
            },
            p: {
              xs: '1rem',
              sm: '2rem',
            },
          }}
        >
          {content.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: {
                  xs: '100%',
                  sm: '30%',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  height: '50px',
                  color: theme.palette.primary.main,
                }}
              >
                {item.icon}
                <Box
                  sx={{
                    mt: '0.5rem',
                  }}
                >
                  <Text variant="h5" sx={{ fontWeight: 'bold', mb: '1rem' }}>
                    {item.title}
                  </Text>
                </Box>
              </Box>
              <Box sx={{ mb: '1rem' }}>
                <Text variant="body1" sx={{}}>
                  {item.text}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CommunityAdvantages;
