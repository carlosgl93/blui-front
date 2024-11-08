import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';
import Loading from '@/components/Loading';
import { Text, Title } from '@/components/StyledComponents';
import { Box, ListItem, Button, Avatar } from '@mui/material';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';

const DesktopResultList = () => {
  const { isLoading, infinitePrestadores, infinitePrestadoresIsLoading } = useGetPrestadores();

  if (isLoading || infinitePrestadoresIsLoading) return <Loading />;

  if (infinitePrestadores?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          px: '2rem',
        }}
      >
        {/* <Text>Conoces a alguien para esta comuna y servicio? Invitalo a Blui!</Text> */}
        <Text>Aún no hay prestadores para estos filtros!</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        component={'ul'}
        sx={{
          maxWidth: '75%',
        }}
      >
        {infinitePrestadores?.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page.prestadores.map((prestador) => {
                const {
                  id,
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
                    key={id}
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
                          <Reviews
                            average={averageReviews || 0}
                            total_reviews={totalReviews || 0}
                          />
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
            </div>
          );
        })}
      </Box>
      <Box className="bottomSentinel" />
    </>
  );
};

export default DesktopResultList;
