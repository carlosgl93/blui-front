import { Box } from '@mui/system';
import { DateCalendar, PickersDayProps } from '@mui/x-date-pickers';
import { StyledLabel } from './StyledScheduleModal';
import dayjs from 'dayjs';

export const SelectCalendarDate = ({
  shouldDisableDay,
  renderAvailableDay,
  handleSelectDate,
  selectedDates,
}: {
  shouldDisableDay: (date: dayjs.Dayjs) => boolean;
  renderAvailableDay: (props: PickersDayProps<dayjs.Dayjs>) => JSX.Element;
  handleSelectDate: (e: dayjs.Dayjs) => void;
  selectedDates: dayjs.Dayjs[] | null;
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <StyledLabel>Fecha</StyledLabel>
    <DateCalendar
      shouldDisableDate={shouldDisableDay}
      disablePast={true}
      slots={{ day: renderAvailableDay }}
      slotProps={{
        day: {
          // @ts-ignore
          selectedDays: selectedDates,
        },
      }}
      onChange={handleSelectDate}
      showDaysOutsideCurrentMonth
    />
    {/* <StaticDatePicker
      shouldDisableDate={shouldDisableDay}
      disablePast={true}
      onChange={handleSelectDate}
      slots={{
        day: renderAvailableDay,
      }}
      defaultValue={dayjs()}
      showDaysOutsideCurrentMonth
    /> */}
  </Box>
);
