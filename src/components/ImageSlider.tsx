import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import SearchBarComponent from './SearchBar';

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

const ImageSliderContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const ImageSliderImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 0.5s ease-in-out',
});

const ImageSliderOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

const ImageSliderText = styled(Typography)({
  color: 'white',
  zIndex: 1,
});

const images = [
  `${import.meta.env.VITE_PUBLIC_URL}/slide-1.jpg`,
  `${import.meta.env.VITE_PUBLIC_URL}/slide-2.jpg`,
  `${import.meta.env.VITE_PUBLIC_URL}/slide-3.jpg`,
];

function ImageSlider({ interval = 5000 }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, interval]);

  return (
    <ImageSliderContainer>
      {images.map((image, index) => (
        <ImageSliderImage
          key={index}
          style={{ backgroundImage: `url(${image})`, opacity: index === currentImageIndex ? 1 : 0 }}
        >
          {index === currentImageIndex && <ImageSliderOverlay />}
        </ImageSliderImage>
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          textAlign: 'center',
          p: {
            xs: '1rem',
          },
        }}
      >
        <ImageSliderText
          variant="h1"
          sx={{
            fontSize: '2.5rem',
            mb: '1rem',
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Encuentra ayuda confiable y segura cerca de ti
        </ImageSliderText>
        <ImageSliderText
          variant="subtitle1"
          sx={{
            color: 'white',
          }}
        >
          Blui conecta a personas para construir una red de apoyo segura y comunitaria
        </ImageSliderText>
        <SearchBarComponent />
      </Box>
    </ImageSliderContainer>
  );
}

export default ImageSlider;
