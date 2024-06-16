import {
  AboutContainer,
  AboutDescription,
  AboutTitle,
  HeroContainer,
  ReviewsContainer,
  StyledAvatar,
  StyledCTAs,
  StyledNameContainer,
  StyledServicio,
  StyledTitle,
  Wrapper,
} from '../PerfilPrestador/MobilePerfilPrestadorStyledComponents';
import Reviews from '@/components/Reviews';
import { ListAvailableDays } from '../PerfilPrestador/ListAvailableDays';
import { Box, styled } from '@mui/material';
import PerfilBackButton from './PerfilBackButton';
import { Prestador } from '@/store/auth/prestador';
import {
  StyledContactButton,
  StyledShortListButton,
} from './DesktopPerfilPrestadorStyledComponents';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { ServiciosCarousel } from '../PerfilPrestador/ServiciosCarousel';

const SectionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
  padding: '1rem 1rem',
}));

const SectionTitle = styled(StyledTitle)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '1.5rem',
}));

type PreviewMobileProfileProps = {
  fullProvider: Prestador | undefined;
};

export const PreviewMobileProfile = ({ fullProvider }: PreviewMobileProfileProps) => {
  const {
    firstname,
    imageUrl,
    averageReviews,
    totalReviews,
    description,
    email,
    servicio,
    especialidad,
    createdServicios,
    availability,
  } = fullProvider as Prestador;

  return (
    <Wrapper>
      <HeroContainer>
        <PerfilBackButton />
        <StyledAvatar alt={`Imagen de perfil de ${firstname}`} src={imageUrl} />
        <StyledNameContainer>
          <StyledTitle>{firstname ? firstname : email}</StyledTitle>
        </StyledNameContainer>
        <ReviewsContainer>
          <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
        </ReviewsContainer>

        <StyledServicio>
          {servicio} {especialidad && `/ ${especialidad}`}
        </StyledServicio>
        <StyledCTAs>
          <StyledContactButton>Ver conversación</StyledContactButton>
          <StyledShortListButton startIcon={<EditCalendarOutlinedIcon />}>
            Agendar
          </StyledShortListButton>
        </StyledCTAs>
      </HeroContainer>
      <AboutContainer>
        <AboutTitle>Sobre {firstname ? firstname : email}</AboutTitle>
        <AboutDescription>
          {description ? description : 'Este prestador aun no agrega información'}
        </AboutDescription>
      </AboutContainer>
      <SectionContainer>
        <SectionTitle>Servicios</SectionTitle>
        <ServiciosCarousel createdServicios={createdServicios} />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Disponibilidad</SectionTitle>
        <ListAvailableDays disponibilidad={availability ?? []} />
      </SectionContainer>
    </Wrapper>
  );
};
