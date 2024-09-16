import { Box, ListItem, Button, Avatar } from '@mui/material';
import { Text, Title } from '@/components/StyledComponents';
import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';
import { Prestador } from '@/store/auth/prestador';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

type DesktopResultListProps = {
  filteredResults: Prestador[];
};

const DesktopResultList = ({ filteredResults }: DesktopResultListProps) => {
  const { isLoading } = useGetPrestadores();

  if (isLoading) return <Loading />;

  if (filteredResults.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          px: '2rem',
        }}
      >
        <Text>Conoces a alguien para esta comuna y servicio? Invitalo a Blui!</Text>
      </Box>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <Box
        component={'ul'}
        sx={{
          maxWidth: '75%',
        }}
      >
        {filteredResults.map((prestador) => {
          const {
            id,
            email,
            firstname,
            lastname,
            servicio,
            especialidad,
            averageReviews,
            totalReviews,
            profileImageUrl,
          } = prestador;

          return (
            <Link
              to={`/perfil-prestador/${id}`}
              style={{
                textDecoration: 'none',
              }}
              key={email}
            >
              <ListItem
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '30% 70%',
                  mb: '1rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignContent: 'start',
                    alignItems: 'start',
                  }}
                >
                  <Avatar
                    sx={{
                      height: '120px',
                      width: '120px',
                    }}
                    src={profileImageUrl}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: '3vh',
                  }}
                >
                  <Box>
                    <Title
                      variant="h6"
                      color="primary"
                      sx={{
                        fontSize: '1.4rem',
                      }}
                    >
                      {firstname} {lastname}
                    </Title>
                    <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
                  </Box>
                  <Text>Servicio: {servicio}</Text>
                  <Text>{especialidad}</Text>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: '1vh',
                      maxWidth: '50%',
                    }}
                  >
                    Ver perfil
                  </Button>
                </Box>
                {/* TODO implement availability */}
                {/* <Text>Availability: {prestador.availability.map((a) => a.name).join(', ')}</Text> */}
              </ListItem>
            </Link>
          );
        })}
      </Box>
    </Suspense>
  );
};

export default DesktopResultList;
