import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
import { useState } from 'react';

export function useDateSelect() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const selectedDate = formatDateRange(startDate, endDate);

  const inRange = (date: string): 'no' | 'range' | 'single' => {
    if (!startDate || !endDate) {
      return 'no';
    }

    if (startDate === endDate) {
      return date === startDate ? 'single' : 'no';
    }

    const day = dayjs(date);
    const isWeekend = day.day() === 0 || day.day() === 6;

    if (date >= startDate && date <= endDate && !isWeekend) {
      return 'range';
    }
    return 'no';
  };

  const dayCount = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;
  const datesArray = Array.from({ length: dayCount }, (_, i) =>
    dayjs(startDate).add(i, 'day').format('YYYY-MM-DD')
  );

  const selectedDates = datesArray.filter((date) => inRange(date) !== 'no');

  return [
    selectedDate,
    setStartDate,
    setEndDate,
    inRange,
    datesArray,
    selectedDates,
  ] as const;
}

function formatDateRange(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return '';
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (start.isSame(end, 'day')) {
    return start.format('Do');
  }

  if (start.isSame(end, 'month')) {
    return `${start.format('Do')} - ${end.format('Do')}`;
  }

  if (start.isSame(end, 'year')) {
    return `${start.format('Do MMM')} - ${end.format('Do MMM')}`;
  }

  return `${start.format('Do MMM YYYY')} - ${end.format('Do MMM YYYY')}`;
}
