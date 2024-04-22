import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { useAuthNew } from '@/hooks';

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
}

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  maxWidth: '80%',
  margin: '0 auto',
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: theme.palette.primary.main,
  textAlign: 'start',
}));

const StyledSelect = styled(Select)(() => ({
  minWidth: '220px',
}));

const StyledTextField = styled(TextField)(() => ({}));

export const PerfilUsuario = () => {
  const { user } = useAuthNew();
  console.log(user);

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      firstName: user?.firstname || '',
      lastName: user?.lastname || '',
      gender: user?.gender || '',
      dob: user?.dob || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>Actualizar Perfil</StyledTitle>
      <StyledTextField
        {...register('firstName', { required: true })}
        label="Nombre"
        variant="outlined"
      />
      <StyledTextField
        {...register('lastName', { required: true })}
        label="Apellido"
        variant="outlined"
      />
      <FormControl variant="outlined">
        <InputLabel id="gender-label">Género</InputLabel>
        <StyledSelect
          labelId="gender-label"
          label="Género"
          {...register('gender', { required: true })}
        >
          <MenuItem value="male">Masculino</MenuItem>
          <MenuItem value="female">Femenino</MenuItem>
          <MenuItem value="other">Otro</MenuItem>
        </StyledSelect>
      </FormControl>
      <StyledTextField
        sx={{
          minWidth: '220px',
        }}
        {...register('dob', { required: true })}
        label="Fecha de Nacimiento"
        type="date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <StyledTextField
        {...register('phone', { required: true })}
        label="Teléfono"
        variant="outlined"
      />
      <StyledTextField
        {...register('address', { required: true })}
        label="Dirección"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Actualizar
      </Button>
    </StyledForm>
  );
};
