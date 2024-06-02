import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { UserCreatedServicio } from '@/pages/ConstruirPerfil/Servicio/types';

type ServiceSelectorProps = {
  prestadorCreatedServicios: UserCreatedServicio[] | undefined;
  handleSelectServicio: (serviceId: string) => void;
};

const ServiceSelector = ({
  prestadorCreatedServicios,
  handleSelectServicio,
}: ServiceSelectorProps) => {
  return (
    <FormControl
      sx={{
        mx: 'auto',
      }}
    >
      <InputLabel id="service-selector-label">Selecciona el servicio</InputLabel>
      <Select
        labelId="service-selector"
        id="service-selector"
        label="Selecciona el servicio"
        onChange={(e) => handleSelectServicio(e.target.value)}
        sx={{
          width: {
            xs: '75vw',
            sm: '50vw',
            md: 'fit-content',
          },
        }}
        defaultValue=""
      >
        <MenuItem value="">Selecciona un servicio:</MenuItem>
        {prestadorCreatedServicios?.map((e) => (
          <MenuItem key={e.id} value={e.id}>
            {e.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceSelector;
