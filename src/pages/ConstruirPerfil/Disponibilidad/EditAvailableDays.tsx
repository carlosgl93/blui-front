import { Box, Button, Switch } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AvailabilityData, StyledDayName } from './ListAvailableDays';
import { CenteredDivider } from '@/components/StyledDivider';
import {
  Container,
  StyledDayContainer,
  StyledEditableDay,
  StyledTimePickerContainer,
  StyledTimerContainer,
  StyledToggleContainer,
} from './EditAvailableDaysStyledComp';
import { useDisponibilidadNew } from '@/hooks/useDisponibilidadNew';
import Loading from '@/components/Loading';
import dayjs from 'dayjs';

type EditAvailableDaysProps = {
  availability: AvailabilityData[];
};

export const EditAvailableDays = ({ availability }: EditAvailableDaysProps) => {
  const {
    saveDisponibilidadLoading,
    handleToggleDisponibilidadDay,
    handleTimeChange,
    handleSaveDisponibilidad,
    handleEditDisponibilidad,
  } = useDisponibilidadNew();

  return saveDisponibilidadLoading ? (
    <Loading />
  ) : (
    <Container>
      {availability &&
        availability?.map((d) => {
          const { id, day, times, isAvailable } = d;
          return (
            <StyledDayContainer key={id + day}>
              <CenteredDivider />
              <StyledEditableDay
                sx={{
                  width: {
                    xs: '100%',
                    sm: '100%',
                    md: '50%',
                  },
                }}
              >
                <StyledToggleContainer>
                  <StyledDayName>{day}</StyledDayName>
                  <Switch
                    checked={isAvailable}
                    onClick={() => handleToggleDisponibilidadDay(day)}
                  />
                </StyledToggleContainer>
                {isAvailable && (
                  <StyledTimePickerContainer>
                    <StyledTimerContainer>
                      <TimePicker
                        label="Inicio"
                        value={dayjs(times.startTime, 'HH:mm')}
                        onChange={(e) => handleTimeChange(e!, id, 'startTime')}
                        minutesStep={30}
                      />
                    </StyledTimerContainer>
                    <StyledTimerContainer>
                      <TimePicker
                        sx={{
                          display: 'flex',
                        }}
                        label="Término"
                        value={dayjs(times.endTime, 'HH:mm')}
                        onChange={(e) => handleTimeChange(e!, id, 'endTime')}
                        minutesStep={30}
                        minTime={dayjs(times.startTime, 'HH:mm')}
                      />
                    </StyledTimerContainer>
                  </StyledTimePickerContainer>
                )}
              </StyledEditableDay>
            </StyledDayContainer>
          );
        })}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80vw',
          gap: '2rem',
          mt: '1rem',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            my: '1rem',
          }}
          onClick={() => handleEditDisponibilidad()}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            my: '1rem',
          }}
          onClick={() => handleSaveDisponibilidad()}
        >
          Guardar
        </Button>
      </Box>
    </Container>
  );
};
