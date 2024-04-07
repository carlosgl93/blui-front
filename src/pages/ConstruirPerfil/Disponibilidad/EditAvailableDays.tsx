import { Box, Button, Switch, TextField } from '@mui/material';

import { AvailabilityData, StyledDayName } from './ListAvailableDays';
import { CenteredDivider } from '@/components/StyledDivider';
import useConstruirPerfil from '@/store/construirPerfil';
import {
  Container,
  StyledDayContainer,
  StyledEditableDay,
  StyledTimePickerContainer,
  StyledTimerContainer,
  StyledTimeTitle,
  StyledToggleContainer,
} from './EditAvailableDaysStyledComp';
import { useDisponibilidadNew } from '@/hooks/useDisponibilidadNew';
import Loading from '@/components/Loading';

type EditAvailableDaysProps = {
  availability: AvailabilityData[];
};

export const EditAvailableDays = ({ availability }: EditAvailableDaysProps) => {
  const {
    handleToggleDisponibilidadDay,
    handleTimeChange,
    handleSaveDisponibilidad,
    saveDisponibilidadLoading,
  } = useDisponibilidadNew();
  const [, { handleEditDisponibilidad }] = useConstruirPerfil();

  return saveDisponibilidadLoading ? (
    <Loading />
  ) : (
    <Container>
      {availability &&
        availability?.map((d) => {
          const { day, times, isAvailable } = d;
          return (
            <StyledDayContainer key={day}>
              <CenteredDivider />
              <StyledEditableDay>
                <StyledToggleContainer>
                  <Switch
                    checked={isAvailable}
                    onClick={() => handleToggleDisponibilidadDay(day)}
                  />
                  <StyledDayName>{day}</StyledDayName>
                </StyledToggleContainer>
                {isAvailable && (
                  <StyledTimePickerContainer>
                    <StyledTimerContainer>
                      {/* Start Time */}

                      <StyledTimeTitle>Inicio:</StyledTimeTitle>
                      <TextField
                        type="time"
                        onChange={(e) => handleTimeChange(e, 'startTime')}
                        value={times.startTime}
                        name={`startTime${day}`}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </StyledTimerContainer>
                    <StyledTimerContainer>
                      {/* End Time */}
                      <StyledTimeTitle>Término:</StyledTimeTitle>

                      <TextField
                        type="time"
                        onChange={(e) => handleTimeChange(e, 'endTime')}
                        value={times.endTime}
                        name={`endTime${day}`}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
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
