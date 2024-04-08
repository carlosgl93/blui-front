import { ListItem, Avatar, Button, Box, useTheme, List } from '@mui/material';
import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';
import { Text, Title } from '@/components/StyledComponents';
import { Prestador } from '@/store/auth/prestador';

type MobileFilteredProps = {
  filteredPrestadores: Prestador[];
};

export const MobileResultList = ({ filteredPrestadores }: MobileFilteredProps) => {
  const theme = useTheme();

  return (
    <List
      component={'ul'}
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {filteredPrestadores?.length > 0 ? (
        filteredPrestadores?.map((prestador) => {
          const { id, firstname, lastname, averageReviews, totalReviews, email } = prestador;

          return (
            <Link
              key={id}
              to={`/perfil-prestador/${id}`}
              style={{ textDecoration: 'none' }}
              state={{
                prestador,
              }}
            >
              <ListItem
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '30% 70%',
                  justifyContent: 'space-around',
                  gap: '1rem',
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
                      height: '90px',
                      width: '90px',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: '3vh',
                    pr: '5vw',
                  }}
                >
                  <Box>
                    <Title
                      variant="h6"
                      sx={{
                        fontSize: '1.25rem',
                        color: theme.palette.primary.main,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {firstname ? firstname : email} {lastname}
                    </Title>
                    <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
                  </Box>
                  <Text>{prestador.servicio}</Text>

                  <Text>{prestador.especialidad}</Text>
                  <Button
                    variant="outlined"
                    sx={{
                      mt: '2vh',
                    }}
                  >
                    Ver perfil
                  </Button>
                </Box>
                {/* <Text>Availability: {availability.map((a) => a.name).join(', ')}</Text> */}
              </ListItem>
            </Link>
          );
        })
      ) : (
        <Box
          sx={{
            px: '2rem',
          }}
        >
          <Text>Conoces a alguien para esta comuna y servicio? Invitalo a Blui!</Text>
        </Box>
      )}
    </List>
  );
};
