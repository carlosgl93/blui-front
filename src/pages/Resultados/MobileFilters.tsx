import { ChangeEvent } from 'react';
import { List, ListItemButton, ListItemText, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { StyledSelect, Title } from '@/components/StyledComponents';
import FiltersSearchBar from './FiltersSearchBar';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Servicio } from '@/types/Servicio';
import { useServicios } from '@/hooks/useServicios';

type MobileFiltersProps = {
  closeFilters: () => void;
};

export const MobileFilters = ({ closeFilters }: MobileFiltersProps) => {
  const [{ servicio, especialidad, comuna }, { removeComuna, selectServicio, selectEspecialidad }] =
    useRecibeApoyo();

  const { allServicios } = useServicios();

  const especialidades = allServicios
    .map((s) => s.especialidades)
    .map((e) => e.map((esp) => esp.especialidadName));

  const handleSelectServicio = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      selectServicio(null);
      selectEspecialidad(undefined);
      return;
    }
    const selectedService = allServicios.find((s: Servicio) => s.serviceName === e.target.value);
    selectEspecialidad(undefined);
    selectServicio(selectedService as Servicio);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        p: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: '1.75rem',
        }}
      >
        <Button
          variant="outlined"
          onClick={closeFilters}
          sx={{
            display: 'flex',
            borderRadius: '1rem',
            borderColor: '#99979c',
          }}
        >
          Cerrar <CloseIcon />
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title
          variant="h6"
          sx={{
            fontSize: '1.2rem',
          }}
        >
          Comuna donde recibirás apoyo.
        </Title>
      </Box>
      <FiltersSearchBar />
      {comuna && (
        <List>
          <ListItemButton
            onClick={() => removeComuna(comuna!)}
            sx={{
              color: 'secondary.main',
              display: 'grid',
              gridTemplateColumns: '90% 10%',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'primary.dark',
              borderRadius: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'primary.dark',
              ':hover': {
                backgroundColor: 'primary.light',
                color: 'primary.dark',
              },
              my: '1vh',
            }}
          >
            <ListItemText primary={comuna.name} />
          </ListItemButton>
        </List>
      )}

      <Box
        sx={{
          my: '1rem',
        }}
      >
        {/* SERVICIO */}
        <Title
          variant="h6"
          sx={{
            fontSize: '1.2rem',
          }}
        >
          Servicio
        </Title>
        {allServicios && (
          <StyledSelect value={servicio?.serviceName || ''} onChange={handleSelectServicio}>
            <option value={''} disabled>
              Elige un servicio
            </option>
            {/* semantically clearer for the user to select "Todos" than going back to elige */}
            {/* un servicio para denotar el sacar los filtros o querer todos los resultados. */}
            <option value={''}>Todos</option>
            {allServicios.map((servicio: Servicio) => {
              return (
                <option key={servicio.id} value={servicio.serviceName}>
                  {servicio.serviceName}
                </option>
              );
            })}
          </StyledSelect>
        )}
      </Box>

      {servicio && especialidades && (
        <>
          <Title
            variant="h6"
            sx={{
              fontSize: '1.2rem',
            }}
          >
            Especialidad
          </Title>
          <StyledSelect
            value={especialidad?.especialidadName}
            onChange={(e) => {
              selectEspecialidad(
                servicio.especialidades.find((esp) => esp.especialidadName === e.target.value),
              );
            }}
          >
            <option value="">Selecciona una especialidad</option>
            {servicio.especialidades?.map((especialidad) => {
              return (
                <option key={especialidad.id} value={especialidad.especialidadName}>
                  {especialidad.especialidadName}
                </option>
              );
            })}
          </StyledSelect>
        </>
      )}

      {/* ESPECIALIDAD */}

      {/* DISPONIBILIDAD */}
      {/* <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Disponibilidad
      </Title>
      <StyledUnorderedList>
        {availability.map((day) => {
          return (
            <StyledListItem key={day.id}>
              <StyledCheckboxInput
                type="checkbox"
                id={day.name}
                name="availability"
                value={day.name}
                onClick={() => setAvailability(day)}
              />
              <label htmlFor={day.name}>{day.name}</label>
            </StyledListItem>
          );
        })}
      </StyledUnorderedList> */}
      <Button
        sx={{
          mt: '3rem',
        }}
        onClick={closeFilters}
        variant="contained"
      >
        Buscar
      </Button>
    </Box>
  );
};
