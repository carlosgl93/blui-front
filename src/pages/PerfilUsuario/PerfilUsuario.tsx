import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { usePerfilUsuarioController } from './PerfilUsuarioController';
import UserComunaSearchBar from './UserComunaSearchBar';
import { SaveButton } from '@/components/SaveButton';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Comuna } from '@/types';
import { Text } from '@/components/StyledComponents';

export interface IFormInput {
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  comuna: Comuna | undefined;
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

const FormHelperText = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledTextField = styled(TextField)(() => ({}));

export const PerfilUsuario = () => {
  const { user, updateUserLoading, onSubmit } = usePerfilUsuarioController();

  const { register, handleSubmit, formState, setValue, control } = useForm<IFormInput>({
    defaultValues: {
      email: user?.email || '',
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      gender: user?.gender || '',
      dob: user?.dob || '',
      phone: user?.phone || '',
      address: user?.address || '',
      comuna: user?.comuna,
    },
  });

  const { errors, isValid } = formState;

  return (
    <Box>
      <BackButton
        ignoreMargin
        displayText
        style={{
          margin: '1rem',
          marginBottom: '0rem',
        }}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {updateUserLoading ? (
          <Loading />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              width: {
                xs: '100%',
                sm: '100%',
                md: '33%',
                lg: '50%',
              },
              margin: '0 auto',
              backgroundColor: 'white',
              borderRadius: '1rem',
              p: '1rem 0.5rem',
            }}
          >
            <StyledTitle>Actualizar Perfil</StyledTitle>
            <StyledTextField
              {...register('email', { required: 'Email es requerido' })}
              label="Email"
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <StyledTextField
              {...register('firstname', { required: 'Nombre es requerido' })}
              label="Nombre"
              variant="outlined"
              error={Boolean(errors.firstname)}
              helperText={errors.firstname?.message}
            />
            <StyledTextField
              {...register('lastname', { required: 'Apellido es requerido' })}
              label="Apellido"
              variant="outlined"
              error={Boolean(errors.lastname)}
              helperText={errors.lastname?.message}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Género es requerido' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl variant="outlined" error={Boolean(error)}>
                  <InputLabel id="gender-label">Género</InputLabel>
                  <StyledSelect
                    labelId="gender-label"
                    label="Género"
                    value={value}
                    onChange={onChange}
                    defaultValue={user?.gender}
                  >
                    <MenuItem value="">Selecciona tu genero</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </StyledSelect>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <StyledTextField
              {...register('dob', { required: 'Fecha de Nacimiento es requerida' })}
              label="Fecha de Nacimiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              error={Boolean(errors.dob)}
              helperText={errors.dob?.message}
              sx={{
                minWidth: '220px',
              }}
              // fullWidth
            />
            <StyledTextField
              {...register('phone', { required: 'Teléfono es requerido' })}
              label="Teléfono"
              variant="outlined"
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
            <UserComunaSearchBar register={setValue} />
            <StyledTextField
              {...register('address', { required: 'Dirección es requerida' })}
              label="Dirección"
              variant="outlined"
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />

            {!isValid && (
              <Box
                sx={{
                  p: '1rem',
                }}
              >
                <Text>Asegurate de rellenar todos los campos con información valida.</Text>
              </Box>
            )}
            <SaveButton
              style={{
                marginBottom: '2rem',
              }}
            />
          </Box>
        )}
      </StyledForm>
    </Box>
  );
};
