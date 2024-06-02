import { FormControl, InputLabel, Select, MenuItem, TextField, Box, Button } from '@mui/material';
import { StyledText } from '../StyledConstruirPerfilComponents';
import { ServicioController } from './ServicioController';
import { Servicio } from '@/types/Servicio';
import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { SaveButton } from '@/components/SaveButton';
import Loading from '@/components/Loading';
import { formatCLP } from '@/utils/formatCLP';

const serviceDurationOptions = [
  { value: 15, label: '15 minutos' },
  { value: 30, label: '30 minutos' },
  { value: 45, label: '45 minutos' },
  { value: 60, label: '1 hora' },
  { value: 120, label: '2 horas' },
  { value: 180, label: '3 horas' },
  { value: 240, label: '4 horas' },
  { value: 300, label: '5 horas' },
  { value: 360, label: '6 horas' },
  { value: 420, label: '7 horas' },
  { value: 480, label: '8 horas' },
  { value: 540, label: '9 horas' },
  { value: 600, label: '10 horas' },
  { value: 660, label: '11 horas' },
  { value: 720, label: '12 horas' },
  { value: 960, label: '16 horas' },
  { value: 1440, label: '24 horas' },
];

export const CreateServicio = () => {
  const {
    especialidad,
    nombreServicio,
    tarifa,
    description,
    prestadorServicio,
    duration,
    handleChangeEspecialidad,
    handleNombreServicioChange,
    handleChangeDescription,
    handleChangeTarifa,
    handleSubmit,
    handleIsCreatingServicio,
    handleSelectDuration,
    saveServicioLoading,
  } = ServicioController();

  const { serviceName } = prestadorServicio as Servicio;

  return (
    <>
      <SubTitle>Crea un servicio</SubTitle>
      <StyledText>
        Dado tu clasificación de {serviceName ?? ''}, puedes crear servicios en la siguientes
        especialidades{' '}
      </StyledText>
      {saveServicioLoading ? (
        <Loading />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            my: '1rem',
            width: {
              xs: '75vw',
              sm: '50vw',
              md: 'fit-content',
            },
          }}
        >
          <FormControl>
            <InputLabel id="service-speciality">Selecciona la especialidad del servicio</InputLabel>
            <Select
              labelId="service-speciality"
              id="speciality-select"
              value={especialidad}
              label="Selecciona la especialidad del servicio"
              onChange={handleChangeEspecialidad}
              sx={{
                width: {
                  xs: '75vw',
                  sm: '50vw',
                  md: 'fit-content',
                },
              }}
              defaultValue=""
            >
              <MenuItem value="">Selecciona una especialidad:</MenuItem>
              {prestadorServicio?.especialidades.map((e) => (
                <MenuItem key={e.id} value={e.especialidadName}>
                  {e.especialidadName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Nombre del servicio"
            type="text"
            value={nombreServicio}
            onChange={handleNombreServicioChange}
          />
          <TextField
            label="Descripción del servicio"
            type="text"
            value={description}
            onChange={handleChangeDescription}
          />
          <FormControl>
            <InputLabel id="service-duration-label">Duración del servicio</InputLabel>
            <Select
              labelId="service-duration-label"
              id="service-duration-select"
              value={duration}
              label="Duración del servicio"
              onChange={handleSelectDuration}
              sx={{
                width: {
                  xs: '75vw',
                  sm: '50vw',
                  md: 'fit-content',
                },
              }}
            >
              <MenuItem value="">Selecciona una duración:</MenuItem>
              {serviceDurationOptions.map((e) => (
                <MenuItem key={e.value} value={e.value}>
                  {e.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Precio"
            type="number"
            placeholder={formatCLP(Number(tarifa))}
            value={tarifa}
            onChange={handleChangeTarifa}
            helperText="Sin puntos ni comas."
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button onClick={handleIsCreatingServicio} variant="contained">
              Cancelar
            </Button>
            <SaveButton
              disabled={!tarifa || !nombreServicio || !duration}
              fullWidth={false}
              style={{ margin: 0 }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
