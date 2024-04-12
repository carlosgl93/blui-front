import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { Box, List, ListItem, styled } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Text } from '@/components/StyledComponents';
import { AvailabilityData } from '../ConstruirPerfil/Disponibilidad/ListAvailableDays';

const StyledList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
}));

const StyledListItem = styled(ListItem)(() => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '10% 30% 60%',
  '& > :nth-last-child()': {
    justifyContent: 'end',
  },
  columnGap: '1rem',
}));

const StyledTimeText = styled(Text)(() => ({
  fontSize: '0.8rem',
}));

export const StyledDayName = styled(SubTitle)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginLeft: '1rem',
  marginBottom: 0,
  fontSize: '1rem',
}));

const StyledAvailableIcon = styled(DoneOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledUnAvailableIcon = styled(CloseOutlinedIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

type ListAvailableDaysProps = {
  disponibilidad: AvailabilityData[];
};

export const ListAvailableDays = ({ disponibilidad }: ListAvailableDaysProps) => {
  return (
    <StyledList>
      {disponibilidad.map((d) => {
        const { day, isAvailable, times } = d;
        const { startTime, endTime } = times;

        return (
          <StyledListItem key={day}>
            {isAvailable ? <StyledAvailableIcon /> : <StyledUnAvailableIcon />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: { xs: '60vw' },
              }}
            >
              <StyledDayName
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                {day}
              </StyledDayName>
              {startTime === '00:00' && endTime === '00:00' ? (
                <StyledTimeText>Todo el dia</StyledTimeText>
              ) : (
                <StyledTimeText>
                  De {startTime} a {endTime}
                </StyledTimeText>
              )}
            </Box>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};
