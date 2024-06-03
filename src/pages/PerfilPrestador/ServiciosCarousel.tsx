import { Card, CardHeader, CardContent } from '@mui/material';
import { renderDuration } from '@/utils/renderDuration';
import { Carousel } from 'react-responsive-carousel';
import { formatCLP } from '@/utils/formatCLP';
import { Text } from '@/components/StyledComponents';
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
  );
};
