import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { Box, List, ListItem, styled } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Text } from '@/components/StyledComponents';

const StyledListItem = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
}));

export const StyledDayName = styled(SubTitle)(() => ({
  marginLeft: '1rem',
  marginBottom: 0,
  fontSize: '1rem',
}));

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AvailabilityData {
  day: string;
  times: TimeSlot;
  isAvailable: boolean;
}

type ListAvailableDaysProps = {
  availability: AvailabilityData[] | undefined;
};

export const ListAvailableDays = ({ availability }: ListAvailableDaysProps) => {
  if (!availability) return null;

  return (
    <List>
      {availability.map((d) => {
        const { day, times, isAvailable } = d;
        return (
          <StyledListItem key={day}>
            {isAvailable ? <StyledDoneIcon /> : <StyledCloseIcon />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '50vw',
              }}
            >
              <StyledDayName
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                {day}
              </StyledDayName>
              {times.startTime === '00:00' && times.endTime === '00:00' ? (
                <Text sx={{ fontSize: '0.8rem' }}>Todo el dia</Text>
              ) : null}
            </Box>
          </StyledListItem>
        );
      })}
    </List>
  );
};

const StyledDoneIcon = styled(DoneOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledCloseIcon = styled(CloseOutlinedIcon)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));
