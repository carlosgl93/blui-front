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
} from './MobilePerfilPrestadorStyledComponents';

import Reviews from '@/components/Reviews';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {
  StyledContactButton,
  StyledShortListButton,
} from './DesktopPerfilPrestadorStyledComponents';
import { ChatModal } from '@/components/ChatModal';

import { usePerfilPrestador } from './usePerfilPrestador';
// import { ListAvailableDays } from './ListAvailableDays';
import PerfilBackButton from './PerfilBackButton';
import { Box, styled } from '@mui/material';
// import { Tarifas } from './Tarifas';
import { Prestador } from '@/store/auth/prestador';
import { Tarifas } from './Tarifas';
import { ListAvailableDays } from './ListAvailableDays';

const SectionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
  padding: '1rem 1rem',
}));

const SectionTitle = styled(StyledTitle)(({ theme }) => ({
  marginTop: '2rem',
  color: theme.palette.secondary.dark,
  fontSize: '1.5rem',
}));

type MobileProfileProps = {
  prestador: Prestador;
};

export const MobileProfile = ({ prestador }: MobileProfileProps) => {
  const { handleClose, handleContact, handleSendMessage, open, message, messages, setMessage } =
    usePerfilPrestador(prestador as Prestador);
  const {
    firstname,
    imageUrl,
    averageReviews,
    totalReviews,
    description,
    tarifas,
    availability,
    offersFreeMeetAndGreet,
    email,
    servicio,
    especialidad,
  } = prestador;

  return (
    <Wrapper>
      <HeroContainer>
        <PerfilBackButton />
        <StyledAvatar alt={`Imágen de perfil de ${firstname}`} src={imageUrl} />
        <StyledNameContainer>
          <StyledTitle>{firstname ? firstname : ''}</StyledTitle>
          <ReviewsContainer>
            <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
          </ReviewsContainer>
        </StyledNameContainer>

        <StyledServicio>
          {servicio} {especialidad && '/ especialidad'}
        </StyledServicio>
        <StyledCTAs>
          <StyledContactButton onClick={handleContact}>
            {messages?.length > 0 ? 'Ver conversación' : 'Contactar'}
          </StyledContactButton>
          <ChatModal
            open={open}
            handleClose={handleClose}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            messages={messages}
          />
          <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
            Guardar
          </StyledShortListButton>
        </StyledCTAs>
      </HeroContainer>
      <AboutContainer>
        {firstname}
        <AboutTitle>Sobre {firstname ? firstname : email}</AboutTitle>
        <AboutDescription>
          {description ? description : 'Este prestador aun no agrega información'}
        </AboutDescription>
      </AboutContainer>
      <SectionContainer>
        <SectionTitle>Disponibilidad</SectionTitle>
      </SectionContainer>
      <ListAvailableDays disponibilidad={availability} />
      <SectionContainer>
        <SectionTitle>Tarifas</SectionTitle>
        <Tarifas tarifas={tarifas} freeMeetGreet={offersFreeMeetAndGreet} />
      </SectionContainer>
    </Wrapper>
  );
};
