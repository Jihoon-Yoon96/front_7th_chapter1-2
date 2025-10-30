import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { RepeatType } from '../types';

interface RepeatOptionsProps {
  repeatType: RepeatType;
  setRepeatType: (type: RepeatType) => void;
  repeatInterval: number;
  setRepeatInterval: (interval: number) => void;
  repeatEndDate: string;
  setRepeatEndDate: (date: string) => void;
  daysOfWeek: number[];
  setDaysOfWeek: (days: number[]) => void;
  dayOfMonth: number;
  setDayOfMonth: (day: number) => void;
  monthOfYear: number;
  setMonthOfYear: (month: number) => void;
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

export const RepeatOptions = ({
  repeatType,
  setRepeatType,
  repeatInterval,
  setRepeatInterval,
  repeatEndDate,
  setRepeatEndDate,
  daysOfWeek,
  setDaysOfWeek,
  dayOfMonth,
  setDayOfMonth,
  monthOfYear,
  setMonthOfYear,
}: RepeatOptionsProps) => {
  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <FormLabel id="repeat-type-label">반복 유형</FormLabel>
        <Select
          id="repeat-type"
          aria-labelledby="repeat-type-label"
          size="small"
          value={repeatType}
          onChange={(e) => setRepeatType(e.target.value as RepeatType)}
        >
          <MenuItem value="none">없음</MenuItem>
          <MenuItem value="daily">매일</MenuItem>
          <MenuItem value="weekly">매주</MenuItem>
          <MenuItem value="monthly">매월</MenuItem>
          <MenuItem value="yearly">매년</MenuItem>
        </Select>
      </FormControl>

      {repeatType === 'weekly' && (
        <FormControl fullWidth>
          <FormLabel>요일 선택</FormLabel>
          <Stack direction="row" spacing={1}>
            {weekDays.map((day, index) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={daysOfWeek.includes(index)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDaysOfWeek([...daysOfWeek, index]);
                      } else {
                        setDaysOfWeek(daysOfWeek.filter((d) => d !== index));
                      }
                    }}
                  />
                }
                label={day}
              />
            ))}
          </Stack>
        </FormControl>
      )}

      {(repeatType === 'monthly' || repeatType === 'yearly') && (
        <FormControl fullWidth>
          <FormLabel>일자</FormLabel>
          <TextField
            size="small"
            type="number"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(Number(e.target.value))}
            slotProps={{ htmlInput: { min: 1, max: 31 } }}
          />
        </FormControl>
      )}

      {repeatType === 'yearly' && (
        <FormControl fullWidth>
          <FormLabel>월</FormLabel>
          <Select
            size="small"
            value={monthOfYear}
            onChange={(e) => setMonthOfYear(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {i + 1}월
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <FormLabel>반복 간격</FormLabel>
          <TextField
            size="small"
            type="number"
            value={repeatInterval}
            onChange={(e) => setRepeatInterval(Number(e.target.value))}
            slotProps={{ htmlInput: { min: 1 } }}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>반복 종료일</FormLabel>
          <TextField
            size="small"
            type="date"
            value={repeatEndDate}
            onChange={(e) => setRepeatEndDate(e.target.value)}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};
