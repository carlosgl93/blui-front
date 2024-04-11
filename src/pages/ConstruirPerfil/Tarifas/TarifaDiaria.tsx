import { Box, TextField } from '@mui/material';

import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { formatCLP } from '@/utils/formatCLP';
import { TarifaFront } from '@/types';

type TarifaDiariaProps = {
  tarifa: TarifaFront;
  handleChangeTarifa: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tarifa: TarifaFront,
  ) => void;
};

export const TarifaDiaria = ({ tarifa, handleChangeTarifa }: TarifaDiariaProps) => {
  const { dayName, price } = tarifa;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
        }}
      >
        <SubTitle
          sx={{
            mt: '1rem',
            fontSize: '1.125rem',
          }}
        >
          {dayName}
        </SubTitle>
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          type="number"
          placeholder={` ${formatCLP(Number(price))}`}
          value={price}
          onChange={(e) => handleChangeTarifa(e, tarifa)}
          name={`tarifa${dayName}`}
        />
      </Box>
    </Box>
  );
};
