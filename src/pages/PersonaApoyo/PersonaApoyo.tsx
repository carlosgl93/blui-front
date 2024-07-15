import { Link } from 'react-router-dom';

import Meta from '@/components/Meta';
import { Avatar, Box, Button } from '@mui/material';
import { Image, StyledImageContainer } from '@/components/ImageContainer';
import {
  AvatarContainer,
  PersonContainer,
  Section,
  StyledButton,
  Text,
  TextContainer,
  Title,
} from '@/components/StyledComponents';
import ComoFunciona from '@/components/ComoFunciona';
import { comoFuncionaCardsContent } from './comoFuncionaContent';

const serviciosPrestados = [
  {
    img: '/images/servicios/enfermeria.jpg',
    title: 'Enfermería',
    description: 'En Blui podrás entregar apoyo a tu comunidad como enfermero/a',
  },
  {
    img: '/images/servicios/cuidadora.jpg',
    title: 'Cuidadora',
    description: 'En Blui podrás entregar apoyo a tu comunidad prestando servicios de cuidado.',
  },
  {
    img: '/images/servicios/sana-compania.jpg',
    title: 'Sana Compañía',
    description:
      'En Blui podrás entregar apoyo a tu comunidad brindando compañía y apoyo emocional.',
  },
  {
    img: '/images/servicios/kinesiologia.jpg',
    title: 'Kinesiología',
    description: 'En Blui podrás entregar apoyo a tu comunidad como kinesiólogo/a.',
  },
  {
    img: '/images/servicios/quiropractico.jpg',
    title: 'Quiropráctico',
    description: 'En Blui podrás entregar apoyo a tu comunidad como quiropráctico/a.',
  },
  {
    img: '/images/servicios/odontologia.jpg',
    title: 'Odontología',
    description: 'En Blui podrás entregar apoyo a tu comunidad como odontólogo/a.',
  },
  {
    img: '/images/servicios/fonoaudiologia.jpg',
    title: 'Fonoaudiología',
    description: 'En Blui podrás entregar apoyo a tu comunidad como fonoaudiólogo/a.',
  },
  {
    img: '/images/servicios/podologia.jpg',
    title: 'Podología',
    description: 'En Blui podrás entregar apoyo a tu comunidad como podólogo/a.',
  },
  {
    img: '/images/servicios/estilista.jpg',
    title: 'Estilista',
    description: 'En Blui podrás entregar apoyo a tu comunidad como estilista.',
  },
  {
    img: '/images/servicios/terapeuta-ocupacional.jpg',
    title: 'Terapeuta Ocupacional',
    description: 'En Blui podrás entregar apoyo a tu comunidad como terapeuta ocupacional.',
  },
  {
    img: '/images/servicios/apoyo-en-el-hogar.jpg',
    title: 'Apoyo en el Hogar',
    description: 'En Blui podrás entregar apoyo a tu comunidad como apoyo en el hogar.',
  },
  {
    img: '/images/servicios/tecnico-en-enfermeria.jpg',
    title: 'Técnico en Enfermería',
    description: 'En Blui podrás entregar apoyo a tu comunidad como técnico en enfermería.',
  },
];

function PersonaApoyo() {
  return (
    <>
      <Meta title="Persona de apoyo" />
      <Section
        component="section"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: '1fr 1fr',
            lg: '1fr 1fr',
          },
          gap: '2rem',
          px: {
            xs: 1,
            sm: 4,
            md: 12,
            lg: 16,
          },
          py: {
            sm: 4,
            md: 8,
            lg: 20,
          },
        }}
      >
        <TextContainer
          sx={{
            justifyContent: 'start',
            height: '100%',
          }}
        >
          <Title>Entregar lo mejor de uno por el otro</Title>
          <Text
            sx={{
              fontSize: '1.5rem',
            }}
          >
            Únete a nuestra comunidad Blui y presta apoyo a todos aquellos adultos mayores y
            personas con discapacidad que lo necesiten.
          </Text>
          <Button
            component={Link}
            to="/entrega-apoyo"
            variant="outlined"
            sx={{
              maxWidth: '30%',
              borderRadius: '5px',
            }}
          >
            Comenzar
          </Button>
        </TextContainer>
        <StyledImageContainer>
          <Image
            src="/images/una-comunidad-de-apoyo.png"
            alt="Enfermera ayudando a una persona a pararse de su silla de ruedas"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: {
                xs: 'contain',
                sm: 'cover',
              },
            }}
          />
        </StyledImageContainer>
      </Section>
      <Section
        sx={{
          backgroundColor: 'white',
          px: {
            xs: 1,
            sm: 4,
            md: 8,
            lg: 12,
          },
          py: {
            sm: 4,
            md: 8,
            lg: 20,
          },
          flexDirection: 'column',
        }}
      >
        <TextContainer
          sx={{
            textAlign: 'center',
            px: {
              xs: 1,
              sm: 4,
              md: 8,
              lg: 12,
            },
            py: {
              sm: 4,
              md: 8,
            },
          }}
        >
          <Title
            variant="h2"
            sx={{
              fontsize: {
                xs: '1.5rem',
                sm: '2.5rem',
                md: '3rem',
                lg: '4rem',
              },
            }}
            gutterBottom
          >
            Los servicios que puedes entregar en Blui
          </Title>
        </TextContainer>
        <AvatarContainer>
          {serviciosPrestados.map((servicio) => (
            <PersonContainer key={servicio.title}>
              <Avatar
                sx={{ width: 120, height: 120, borderRadius: '50%' }}
                src={servicio.img}
                alt={servicio.title}
                slotProps={{
                  img: {
                    loading: 'lazy',
                  },
                }}
              />
              <Title
                variant="h6"
                sx={{
                  fontSize: '1.5rem',
                  color: 'primary.main',
                }}
              >
                {servicio.title}
              </Title>
            </PersonContainer>
          ))}
        </AvatarContainer>
        <Link to="/entrega-apoyo">
          <StyledButton
            sx={{
              py: 1,
              px: 4,
              fontSize: '1.25rem',
            }}
          >
            Conviértete en persona de apoyo
          </StyledButton>
        </Link>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            my: {
              xs: 4,
              sm: 8,
            },
          }}
        >
          <Title gutterBottom>¿Por qué elegir Blui?</Title>

          <Box
            sx={{
              display: {
                xs: 'flex',
                md: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRow: 'repeat(2, 1fr)',
                gap: '2rem',
              },
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              px: {
                xs: 1,
                sm: 2,
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: '1.75rem',
                }}
              >
                Sé tu propio jefe
              </Title>
              <Text
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5rem',
                }}
              >
                Como persona de apoyo de Blui tú diriges tu propio negocio. Elije a tus clientes,
                los servicios que quieres proporcionar y las horas que trabajas ¡Administra tu
                propio tiempo!
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: '1.75rem',
                }}
              >
                Red de clientes y prestadores
              </Title>
              <Text
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5rem',
                }}
              >
                Podrás ser parte de la comunidad de apoyo a domicilio más grande del país, con una
                gran cantidad de clientes que requerirán de tus servicios. También podrás encontrar
                en nuestra comunidad a prestadores de servicios complementarios a los tuyos con los
                que podrás crear equipos de trabajo.
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: '1.75rem',
                }}
              >
                Establece tus propias tarifas
              </Title>
              <Text
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5rem',
                }}
              >
                Dado que manejas tu propio negocio, eres libre de poder acordar con el cliente el
                valor del servicio que vayas a prestar.
              </Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: '1.75rem',
                }}
              >
                Cobertura de seguro
              </Title>
              <Text
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5rem',
                }}
              >
                Las personas de apoyo de Blui podrán quedar cubiertos por seguros de responsabilidad
                profesional y contra accidentes.
              </Text>
            </Box>
          </Box>
        </Box>
      </Section>
      <ComoFunciona
        subtitle="Blui es una plataforma on line diseñada para que su uso sea fácil y amigable. Con un simple proceso de 3 pasos podrás estar dentro de nuestra comunidad y listo para comenzar a prestar apoyo."
        steps={comoFuncionaCardsContent}
      />
    </>
  );
}

export default PersonaApoyo;
