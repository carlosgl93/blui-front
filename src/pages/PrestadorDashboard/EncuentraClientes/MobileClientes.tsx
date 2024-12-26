import { Box, useTheme, Button, ListItem, List } from '@mui/material';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { Text, Title } from '@/components/StyledComponents';
import { Link } from 'react-router-dom';
import { useGetClientes } from '@/hooks';

export const MobileClientes = () => {
  const { infiniteClientes } = useGetClientes();
  const theme = useTheme();
  // const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={toggleDrawer}
          sx={{
            borderRadius: '0.5rem',
            p: '0 1rem',
            borderColor: '#99979c',
            maxWidth: '95vw',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              p: '0.5 1rem',
            }}
          >
            <p>Filtros</p>
            <TuneOutlinedIcon />
          </Box>
        </Button>
      </Box> */}

      <Box
        sx={{
          minHeight: '80vh',
          backgroundColor: theme.palette.background.paper,
          m: '5vh 1vw',
          borderRadius: '0.5rem',
        }}
      >
        {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <MobileFilters closeFilters={toggleDrawer} />
        </Drawer> */}

        <Suspense fallback={<Loading />}>
          <List
            component={'ul'}
            sx={{
              minHeight: '90vh',
              m: 0,
              p: 0,
            }}
          >
            {infiniteClientes?.length ? (
              infiniteClientes?.map((page, pageIndex) => {
                return (
                  <div key={pageIndex}>
                    {page.clientes.map((cliente) => {
                      const { id, email, firstname, lastname, service, speciality } = cliente;
                      return (
                        <Link
                          key={id}
                          to={`/ver-apoyo/${id}`}
                          style={{ textDecoration: 'none' }}
                          state={{
                            cliente,
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
                              {/* TODO: add user profile image */}
                              {/* <Avatar
                            sx={{
                              height: '90px',
                              width: '90px',
                            }}
                            src={profileImageUrl}
                          /> */}
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
                              </Box>
                              <Text>{service}</Text>
                              {speciality && <Text>{speciality}</Text>}
                              <Button
                                variant="outlined"
                                sx={{
                                  mt: '2vh',
                                }}
                              >
                                Ver cliente
                              </Button>
                            </Box>
                          </ListItem>
                        </Link>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <Box
                sx={{
                  px: 'auto',
                }}
              >
                <Text>Aun no hay usuarios buscando apoyo para esta comuna</Text>
              </Box>
            )}
          </List>
          <Box className="bottomSentinel" />
        </Suspense>
      </Box>
    </>
  );
};
