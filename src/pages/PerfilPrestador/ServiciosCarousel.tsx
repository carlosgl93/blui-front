import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent, useMediaQuery } from '@mui/material';
import { renderDuration } from '@/utils/renderDuration';
import { Carousel } from 'react-responsive-carousel';
import { formatCLP } from '@/utils/formatCLP';
import { Text, Title } from '@/components/StyledComponents';
import { UserCreatedServicio } from '../ConstruirPerfil/Servicio/types';
import { mobile, tablet } from '@/theme/breakpoints';

type ServiciosCarouselProps = {
  createdServicios: UserCreatedServicio[] | undefined;
};

export const ServiciosCarousel = ({ createdServicios }: ServiciosCarouselProps) => {
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;

  return (
    <Carousel
      autoPlay
      centerMode={true}
      emulateTouch
      showThumbs={false}
      showIndicators={isDesktop ? true : false}
      stopOnHover={true}
      infiniteLoop
      interval={5000}
      width={isMobile ? '50%' : '100%'}
      className="hide-status"
      showArrows={true}
      useKeyboardArrows={true}
    >
      {(createdServicios ?? [])?.map((s) => (
        <Card
          key={s.id ? s.id : s.name + s.description}
          sx={{
            mx: {
              xs: '1rem',
              md: '0',
            },
            my: '1rem',
            boxShadow: `0px 4px 8px 0px`,
            borderRadius: '1rem',
            p: '1rem',
            maxWidth: {
              xs: '100%',
              sm: '90vw',
              md: '33vw',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Title
            sx={{
              fontSize: '1.5rem',
            }}
          >
            {s.name}
          </Title>
          <Text variant="caption">
            {renderDuration(s.duration)} - {formatCLP(s.price)}
          </Text>
          <CardContent
            sx={{
              mb: '2rem',
              px: 0,
            }}
          >
            <Text
              sx={{
                textAlign: 'left',
              }}
            >
              {s.description}
            </Text>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
};
