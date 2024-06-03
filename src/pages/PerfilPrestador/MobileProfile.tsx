import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './mobileProfile.css';
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
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import {
  StyledContactButton,
  StyledShortListButton,
} from './DesktopPerfilPrestadorStyledComponents';
import { ChatModal } from '@/components/ChatModal';
import { usePerfilPrestador } from './usePerfilPrestador';
import PerfilBackButton from './PerfilBackButton';
import { Box, Card, CardContent, CardHeader, styled } from '@mui/material';
import { Prestador } from '@/store/auth/prestador';
import { useChat } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useAuthNew } from '@/hooks/useAuthNew';
import Loading from '@/components/Loading';
import { ScheduleModal } from '@/components/Schedule/ScheduleModal';
import { Carousel } from 'react-responsive-carousel';
import { Text } from '@/components/StyledComponents';
import { renderDuration } from '@/utils/renderDuration';
import { formatCLP } from '@/utils/formatCLP';
import { ListAvailableDays } from './ListAvailableDays';

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
  const {
    handleClose,
    handleContact,
    open,
    handleSchedule,
    handleCloseScheduleModal,
    scheduleModalOpen,
  } = usePerfilPrestador(prestador as Prestador);

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
    email,
    servicio,
    especialidad,
    createdServicios,
    availability,
  } = prestador;

  return (
    <Wrapper>
      <HeroContainer>
        <PerfilBackButton />
        <StyledAvatar alt={`Imágen de perfil de ${firstname}`} src={imageUrl} />
        <StyledNameContainer>
          <StyledTitle>{firstname ? firstname : email}</StyledTitle>
        </StyledNameContainer>
        <ReviewsContainer>
          <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
        </ReviewsContainer>

        <StyledServicio>
          {servicio} {especialidad && '/ especialidad'}
        </StyledServicio>
        <StyledCTAs>
          {messagesLoading ? (
            <Loading />
          ) : (
            <>
              <StyledContactButton onClick={handleContact}>
                {(messages?.messages ?? []).length > 0 ? 'Ver conversación' : 'Contactar'}
              </StyledContactButton>
              <ChatModal
                isLoading={savingMessageLoading}
                open={open}
                handleClose={handleClose}
                message={message}
                setMessage={setMessage}
              />
              <StyledShortListButton
                startIcon={<EditCalendarOutlinedIcon />}
                onClick={handleSchedule}
              >
                Agendar
              </StyledShortListButton>
            </>
          )}
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
        <Carousel
          autoPlay
          centerMode
          emulateTouch
          showThumbs={false}
          stopOnHover
          showIndicators
          infiniteLoop
          interval={10000}
          width={'90vw'}
          className="hide-status"
        >
          {createdServicios?.map((s) => (
            <Card
              key={s.id}
              sx={{
                m: '1rem',
                boxShadow: 5,
                height: 'fit-content',
              }}
            >
              <CardHeader
                title={s.name}
                subheader={`${renderDuration(s.duration)} - ${formatCLP(s.price)}`}
              />
              <CardContent
                sx={{
                  mb: '2rem',
                }}
              >
                <Text>{s.description}</Text>
              </CardContent>
            </Card>
          )) ?? []}
        </Carousel>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Disponibilidad</SectionTitle>
        <ListAvailableDays disponibilidad={availability ?? []} />
      </SectionContainer>

      <ScheduleModal handleClose={handleCloseScheduleModal} open={scheduleModalOpen} />
    </Wrapper>
  );
};
