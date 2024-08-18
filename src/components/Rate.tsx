import { useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star'; // Filled star for selected state
import { Box, Button, useTheme } from '@mui/material';

export const Rate = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const theme = useTheme();

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleMouseOver = (value: number) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleTouchStart = (value: number) => {
    setHover(value);
  };

  const handleTouchEnd = () => {
    setHover(0);
  };

  const submitRating = () => {
    console.log('Rating submitted:', rating);
    // Here you can add the logic to submit the rating to your backend
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <Box
            key={ratingValue}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => handleTouchStart(ratingValue)}
            onTouchEnd={handleTouchEnd}
            onClick={() => handleRating(ratingValue)}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {ratingValue <= (hover || rating) ? (
              <StarIcon sx={{ color: theme.palette.primary.main }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ color: theme.palette.primary.main }} />
            )}
          </Box>
        );
      })}
      <Button variant="contained" onClick={submitRating} disabled={!rating} sx={{ ml: 1 }}>
        Calificar
      </Button>
    </Box>
  );
};
