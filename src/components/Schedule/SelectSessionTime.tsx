import { Box } from '@mui/system';
import dayjs, { Dayjs } from 'dayjs';
import { StyledLabel, StyledDateTimePicker } from './StyledScheduleModal';
import { Text } from '../StyledComponents';

export const SelectSessionTime = ({
  selectedTimes,
  availableTimesStep,
  selectedDates,
  handleSelectSessionHour,
  shouldDisableTime,
}: {
  selectedTimes: {
    [x: number]: dayjs.Dayjs;
    length?: number | undefined;
    toString?: (() => string) | undefined;
    toLocaleString?:
      | {
          (): string;
          (
            locales: string | string[],
            options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions,
          ): string;
        }
      | undefined;
  } | null;
  availableTimesStep: number | undefined;
  selectedDates: dayjs.Dayjs[] | null;
  handleSelectSessionHour: (date: dayjs.Dayjs, time: dayjs.Dayjs) => void;
  shouldDisableTime: (time: dayjs.Dayjs) => boolean;
}) => {
  // i think current selected date would be better defined as the date that does not have a time selected yet
  const currentSelectedDate =
    selectedDates?.filter(
      (date) => !selectedTimes?.[date.format('YYYY-MM-DD') as unknown as number],
    )[0] || selectedDates?.[selectedTimes ? Object.keys(selectedTimes).length : 0];

  const formattedDate = currentSelectedDate?.format('YYYY-MM-DD');
  // @ts-ignore
  const selectedTime = formattedDate ? selectedTimes?.[formattedDate]?.[0] : null;
  return (
    <Box
      id="select-session-time"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StyledLabel>Horas disponibles </StyledLabel>
      <Text>Selecciona una hora para el día: </Text>
      <strong>{currentSelectedDate?.format('DD/MM/YYYY')}</strong>
      <StyledDateTimePicker
        sx={{ mt: '1rem' }}
        shouldDisableTime={shouldDisableTime}
        skipDisabled
        ampm={false}
        value={selectedTime ? selectedTime : null}
        timeStep={availableTimesStep}
        onChange={(time) => handleSelectSessionHour(currentSelectedDate as Dayjs, time)}
      />
    </Box>
  );
};
