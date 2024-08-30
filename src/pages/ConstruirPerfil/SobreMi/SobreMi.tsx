import BackButton from '@/components/BackButton';
import { SaveButton } from '@/components/SaveButton';
import { Text } from '@/components/StyledComponents';
import { useSobreMi } from '@/hooks';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  StyledTitle,
  SubTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Container,
  IconButton,
  TextareaAutosize,
} from '@mui/material';

const textareaStyle = {
  width: '100%', // Full width
  padding: '10px', // Padding inside the textarea
  fontFamily: 'Arial, sans-serif', // Font family
  fontSize: '1rem', // Font size
  borderRadius: '12px', // Rounded corners
  outline: 'none', // Removes the default focus outline
  ':focus': {
    boxShadow: '0 0 5px rgba(80, 32, 72)',
    borderColor: '#502048',
  },
};

export const SobreMi = () => {
  const {
    errorTextColor,
    formState,
    handleSubmit,
    overMaxLength,
    register,
    validTextColor,
    onSubmit,
    maxLength,
    theme,
    prestador,
    descriptionLength,
    disable,
    updateDescriptionLoading,
    fileInputRef,
    handleEditPicture,
    handleImageChange,
    imagePreview,
  } = useSobreMi();

  const { errors } = formState;

  return (
    <Wrapper
      sx={{
        minHeight: '75vh',
      }}
    >
      <BackButton to="/construir-perfil" />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StyledTitle>Sobre mi</StyledTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              width: '100px',
              justifyContent: 'center',
              margin: '2rem auto',
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton onClick={handleEditPicture}>
                  <EditOutlinedIcon color="primary" />
                </IconButton>
              }
            >
              <Avatar
                sx={{
                  width: '128px',
                  height: '128px',
                }}
                alt="User profile picture"
                src={
                  prestador?.profileImageUrl ? prestador.profileImageUrl : (imagePreview as string)
                }
              />
            </Badge>
          </Box>
          <SubTitle>Agrega una descripción de ti.</SubTitle>
          <TextareaAutosize
            {...register('description', { required: true, maxLength: maxLength })}
            style={{
              ...textareaStyle,
              border: `2px solid ${theme.palette.primary.main}`,
              fontFamily: theme.typography.fontFamily,
            }}
            placeholder={
              prestador?.description
                ? prestador.description
                : `Hola! soy ${prestador?.firstname} y...`
            }
            name="description"
            id="userDescription"
            minRows={3}
          />
          <Text
            sx={{
              color: overMaxLength ? errorTextColor : validTextColor,
            }}
          >
            {descriptionLength} / {maxLength}
          </Text>
          {errors.description && (
            <Text variant="body1" sx={{ color: errorTextColor }}>
              Campo requerido
            </Text>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {updateDescriptionLoading ? <CircularProgress /> : <SaveButton disabled={disable} />}
          </Box>
        </form>
      </Container>
      <input
        {...register('profileImage')}
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageChange}
        multiple={false}
      />
    </Wrapper>
  );
};