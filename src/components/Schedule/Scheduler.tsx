import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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

export const Scheduler = () => {
  const {
    handleCloseScheduleModal,
    providerAvailability,
    prestadorCreatedServicios,
    schedule,
    renderAvailableDay,
    setSchedule,
    shouldDisableTime,
    setValue,
    handleSelectServicio,
    handleSubmit,
  } = ScheduleController();

  const { selectedTime, selectedService, selectedDate } = schedule;
  const selectedServiceDuration = selectedService?.duration;
  const availableTimesStep =
    selectedServiceDuration && selectedServiceDuration > 45 ? 60 : selectedServiceDuration;

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

        <FormControl
          sx={{
            mx: 'auto',
          }}
        >
          <InputLabel id="service-selector-label">Selecciona el servicio</InputLabel>
          <Select
            labelId="service-selector"
            id="service-selector"
            label="Selecciona el servicio"
            onChange={(e) => handleSelectServicio(e.target.value)}
            sx={{
              width: {
                xs: '75vw',
                sm: '50vw',
                md: 'fit-content',
              },
            }}
            defaultValue=""
          >
            <MenuItem value="">Selecciona un servicio:</MenuItem>
            {prestadorCreatedServicios?.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* step two, if recurrent ask what days per week customer needs support, else ask for starting and end date and time and explain it has to be approximate (again in spanish) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <StyledLabel>Fecha</StyledLabel>
          <DateCalendar
            shouldDisableDate={(date) => {
              // Disable the date if the provider is not available on this day of the week
              const dayAvailability = providerAvailability?.find((d) => d.id === date.get('day'));
              // If the day is not available, return true to disable it
              return !dayAvailability?.isAvailable;
            }}
            disablePast
            slots={{ day: renderAvailableDay }}
            onChange={(e) => {
              setSchedule((prev) => {
                return { ...prev, selectedDate: e! };
              });
              setValue(e);
            }}
          />
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
                  console.log('selecting time', e);
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
            disabled={!selectedService?.id || !selectedDate || !selectedTime}
            onClick={handleSubmit}
          >
            Agendar
          </Button>
        </Box>
      </StyledScheduleForm>
    </StyledScheduleContainer>
  );
};
