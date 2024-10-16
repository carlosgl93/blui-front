import { Box, Button } from '@mui/material';
import 'dayjs/locale/es-mx';
import { Title } from '../StyledComponents';
import {
  StyledDateTimePicker,
  StyledLabel,
  StyledScheduleContainer,
  StyledScheduleForm,
  StyledTitleContainer,
} from './StyledScheduleModal';
import { DateCalendar } from '@mui/x-date-pickers';
import { ScheduleController } from './ScheduleController';
import dayjs from 'dayjs';
import ServiceSelector from './ServiceSelector';
import Loading from '../Loading';

export const Scheduler = () => {
  const {
    schedule,
    waitingForPayku,
    scheduleServiceLoading,
    handleCloseScheduleModal,
    renderAvailableDay,
    setSchedule,
    shouldDisableTime,
    setValue,
    handleSelectServicio,
    handleSubmit,
    // shouldDisableDay, uncomment this when tests are done
    handleSelectDate,
  } = ScheduleController();

  const { selectedTime, selectedService, selectedDate } = schedule;
  const selectedServiceDuration = selectedService?.duration;
  const availableTimesStep =
    selectedServiceDuration && selectedServiceDuration > 45 ? 60 : selectedServiceDuration;

  if (scheduleServiceLoading || waitingForPayku) return <Loading />;

  return (
    <StyledScheduleContainer>
      <StyledTitleContainer>
        <Title>Agendar</Title>
      </StyledTitleContainer>
      <StyledScheduleForm
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <StyledLabel htmlFor="service-selector">¿Qué servicio necesitas?</StyledLabel>
        <ServiceSelector handleSelectServicio={handleSelectServicio} />

        {schedule.selectedService && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StyledLabel>Fecha</StyledLabel>
            <DateCalendar
              // shouldDisableDate={shouldDisableDay}
              // disablePast={true}
              slots={{ day: renderAvailableDay }}
              onChange={handleSelectDate}
            />
          </Box>
        )}
        <Box>
          {selectedService?.duration && selectedDate && (
            <>
              <StyledLabel>Horas disponibles</StyledLabel>

              <StyledDateTimePicker
                skipDisabled
                ampm={false}
                value={selectedTime}
                timeStep={availableTimesStep}
                disablePast={selectedDate.isBefore(dayjs())}
                onChange={(e) => {
                  setSchedule((prev) => {
                    return { ...prev, selectedTime: e! };
                  });
                  setValue(e);
                }}
                shouldDisableTime={shouldDisableTime}
              />
            </>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button variant="contained" onClick={handleCloseScheduleModal}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={
              !selectedService?.id ||
              !selectedDate ||
              !selectedTime ||
              scheduleServiceLoading ||
              waitingForPayku
            }
            onClick={handleSubmit}
          >
            Agendar
          </Button>
        </Box>
      </StyledScheduleForm>
    </StyledScheduleContainer>
  );
};
