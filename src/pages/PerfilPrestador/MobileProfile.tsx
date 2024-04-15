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
import PerfilBackButton from './PerfilBackButton';
import { Box, styled } from '@mui/material';
import { Prestador } from '@/store/auth/prestador';
import { Tarifas } from './Tarifas';
import { ListAvailableDays } from './ListAvailableDays';
import { useChat } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useAuthNew } from '@/hooks/useAuthNew';
import Loading from '@/components/Loading';

export const SectionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
  padding: '0.5rem 1rem',
}));

export const SectionTitle = styled(StyledTitle)(({ theme }) => ({
  marginTop: '1rem',
  color: theme.palette.secondary.dark,
  fontSize: '1.5rem',
}));

type MobileProfileProps = {
  prestador: Prestador;
};

export const MobileProfile = ({ prestador }: MobileProfileProps) => {
  const { handleClose, handleContact, open } = usePerfilPrestador(prestador as Prestador);

  const { id } = useParams();
  const { user } = useAuthNew();

  const { message, setMessage, messages, messagesLoading, savingMessageLoading } = useChat(
    user?.id ?? '',
    id ?? '',
  );
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
          <StyledTitle>{firstname ? firstname : email}</StyledTitle>
          <ReviewsContainer>
            <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
          </ReviewsContainer>
        </StyledNameContainer>

        <StyledServicio>
          {servicio} {especialidad && '/ especialidad'}
        </StyledServicio>
        <StyledCTAs>
          {messagesLoading ? (
            <Loading />
          ) : (
            <>
              <StyledContactButton onClick={handleContact}>
                {(messages ?? []).length > 0 ? 'Ver conversación' : 'Contactar'}
              </StyledContactButton>
              <ChatModal
                isLoading={savingMessageLoading}
                open={open}
                handleClose={handleClose}
                message={message}
                setMessage={setMessage}
              />
              <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
                Guardar
              </StyledShortListButton>
            </>
          )}
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
        <ListAvailableDays disponibilidad={availability ?? []} />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Tarifas</SectionTitle>
        <Tarifas tarifas={tarifas} freeMeetGreet={offersFreeMeetAndGreet} />
      </SectionContainer>
    </Wrapper>
  );
};
