import { Text } from './StyledComponents';
import { Box, Typography, useTheme } from '@mui/material';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const content = [
  {
    icon: (
      <PeopleAltOutlinedIcon
        sx={{
          fontSize: '3rem',
        }}
      />
    ),
    title: 'LIBERTAD DE ELECCIÓN',
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
    title: 'TRANQUILIDAD Y CONFIANZA',
    text: 'Con Blui puedes tener la tranquilidad y confianza que cada trabajador independiente que ofrezca servicios en nuestra comunidad ha sido sujeto a un exhaustivo control, basado en la verificación de su información personal y profesional a través del Registro Nacional de Prestadores Individuales de Salud, de manera de asegurarnos que la experiencia de los usuarios de Blui sea satisfactoria y por sobre todo segura.',
  },

  {
    icon: (
      <ReviewsOutlinedIcon
        sx={{
          fontSize: '3rem',
        }}
      />
    ),
    title: 'CALIFICACIONES Y COMENTARIOS',
    text: 'En cada perfil de trabajadores independientes que encuentres podrás ver las distintas calificaciones y comentarios que otros miembros de la comunidad Blui hayan dejado en base a sus propias experiencias.',
  },
];

function CommunityAdvantages() {
  const theme = useTheme();

  return (
    <>
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
            DESCUBRE LAS VENTAJAS DE PERTENECER A LA COMUNIDAD BLUI
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
                    color: theme.palette.primary.main,
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ mb: '1rem' }}>
                  <Text variant="h5" sx={{ fontWeight: 'bold', mb: '1rem' }}>
                    {item.title}
                  </Text>
                  <Text variant="body1" sx={{}}>
                    {item.text}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          sizes="(max-width: 700px) 100vw, 700px"
          srcSet="
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_160.png 160w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_245.png 245w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_314.png 314w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_374.png 374w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_432.png 432w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_476.png 476w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_515.png 515w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_561.png 561w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_607.png 607w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_641.png 641w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_678.png 678w,
/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_700.png 700w"
          src="/images/servicios/una-comunidad-de-apoyo_isc6tz/una-comunidad-de-apoyo_isc6tz_c_scale,w_700.png"
          alt="Enfermera con una persona mayor"
        ></img>
      </Box>
    </>
  );
}

export default CommunityAdvantages;
