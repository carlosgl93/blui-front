import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent } from '@mui/material';
import { renderDuration } from '@/utils/renderDuration';
import { Carousel } from 'react-responsive-carousel';
import { formatCLP } from '@/utils/formatCLP';
import { Text, Title } from '@/components/StyledComponents';
import { UserCreatedServicio } from '../ConstruirPerfil/Servicio/types';

type ServiciosCarouselProps = {
  createdServicios: UserCreatedServicio[] | undefined;
};

export const ServiciosCarousel = ({ createdServicios }: ServiciosCarouselProps) => {
  return (
    <Carousel
      autoPlay
      centerMode={createdServicios && createdServicios.length > 1 ? true : false}
      emulateTouch
      showThumbs={false}
      stopOnHover
      showIndicators
      infiniteLoop
      interval={10000}
      width={'90vw'}
      className="hide-status"
    >
      {(createdServicios ?? [])?.map((s) => (
        <Card
          key={s.id ? s.id : s.name + s.description}
          sx={{
            m: '1rem',
            boxShadow: `0px 4px 8px 0px`,
            borderRadius: '1rem',
            p: '1rem',
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
            }}
          >
            <Text>{s.description}</Text>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
};
