import { useMemo } from 'react';
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { User } from '@/store/auth/user';
import Loading from '@/components/Loading';
import BackButton from '@/components/BackButton';
import { Text, Title } from '@/components/StyledComponents';
import { PublicarApoyoController } from './PublicarApoyoController';
import { CenteredFlexBox, ColumnCenteredFlexBox } from '@/components/styled';
import { BackButtonContainer } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';

export const PublicarApoyo = () => {
  const { user, setUserState, description, setDescription, handleSubmit, isLoading, allServicios } =
    PublicarApoyoController();

  const specialities = useMemo(() => {
    return allServicios?.find((s) => s.serviceName === user?.service)?.especialidades || [];
  }, [user?.service]);

  return (
    <Container
      sx={{
        minHeight: '80vh',
        m: '1rem auto',
      }}
    >
      <BackButtonContainer
        sx={{
          py: '1rem',
        }}
      >
        <BackButton displayText to="/usuario-dashboard" />
      </BackButtonContainer>
      <ColumnCenteredFlexBox sx={columnStyle}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Title
              sx={{
                fontSize: '2rem',
                mb: '0.5rem',
              }}
            >
              Publicar apoyo
            </Title>
            <Text>
              Cuentanos más sobre el apoyo que necesitas para que recibas apoyo acorde a tus
              necesidades.
            </Text>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre del paciente"
                placeholder={user?.patientName || 'Nombre del paciente'}
                fullWidth
                margin="normal"
                value={user?.patientName}
                onChange={(e) =>
                  setUserState((prev) => {
                    return { ...prev, patientName: e.target.value } as User;
                  })
                }
              />
              <TextField
                label="Dirección"
                placeholder={user?.address || 'Dirección donde quieres recibir apoyo'}
                fullWidth
                margin="normal"
                value={user?.address}
                onChange={(e) =>
                  setUserState((prev) => {
                    return { ...prev, address: e.target.value } as User;
                  })
                }
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Servicio</InputLabel>
                <Select
                  value={user?.service}
                  onChange={(e) =>
                    setUserState((prev) => {
                      return { ...prev, service: e.target.value } as User;
                    })
                  }
                  label="Servicio"
                >
                  {allServicios.map((s) => (
                    <MenuItem key={s.id} value={s.serviceName}>
                      {s.serviceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {user?.service && specialities?.length > 0 && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Especialidad</InputLabel>
                  <Select
                    value={user?.speciality}
                    onChange={(e) =>
                      setUserState((prev) => {
                        return { ...prev, speciality: e.target.value } as User;
                      })
                    }
                    label="Especialidad"
                  >
                    {specialities.map((s) => (
                      <MenuItem key={s.id} value={s.especialidadName}>
                        {s.especialidadName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <TextField
                label="Descripción del apoyo"
                placeholder="Especifica el tipo de apoyo que necesitas. Esto podría ser lo que deseas que se enfoque el apoyo, por ejemplo, si necesitas apoyo emocional, apoyo para realizar actividades de la vida diaria, etc. También, puedes proveer mas información sobre el paciente y sus necesidades."
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <CenteredFlexBox>
                <Button
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Publicar
                </Button>
              </CenteredFlexBox>
            </form>
          </>
        )}
      </ColumnCenteredFlexBox>
    </Container>
  );
};

const columnStyle = {
  padding: '1rem 1.4rem',
  backgroundColor: 'white',
  borderRadius: '1rem',

  maxWidth: {
    xs: '100%',
    sm: '80%',
    md: '70%',
    lg: '60%',
    xl: '50%',
  },
  margin: 'auto',
};
