'use client';

import styles from './page.module.css';
import dayjs from 'dayjs';
import { TimeslipDateWithClient } from './date';
import { Date } from './date';
import { Dispatch, SetStateAction, useState } from 'react';
import { cn } from '@/app/utils/cn';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAYS_FULL = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function Calendar({
  dates,
  setStartDate,
  setEndDate,
}: {
  dates: TimeslipDateWithClient[];
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
}) {
  const [hideWeekends, setHideWeekends] = useState(true);

  const isHiddenWeekend = (date: string) => {
    if (!hideWeekends) return false;

    if (date === 'S') {
      return true;
    }
    return dayjs(date).day() === 0 || dayjs(date).day() === 6;
  };

  const weekendStyle = (date: string) => {
    const isWe = isHiddenWeekend(date);
    return isWe ? styles.smallWeekend : undefined;
  };

  return (
    <>
      <div className={styles.calendarWrapper}>
        <div
          className={cn(
            styles.calendar,
            hideWeekends ? styles.calendar5 : styles.calendar7
          )}
        >
          {DAYS.map((day, i) => (
            <div key={i} className={cn(styles.dayHeading, weekendStyle(day))}>
              <div></div>
              <div>{day}</div>
              <div>{DAYS_FULL[i].substring(1)}</div>
            </div>
          ))}
          {dates.map((date) => {
            return (
              <div
                key={date.key}
                className={cn(styles.day, weekendStyle(date.key))}
              >
                <Date
                  timeslipDate={date}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  small={isHiddenWeekend(date.key)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={() => setHideWeekends(!hideWeekends)}>
          Weekend
          <br />v
        </button>
      </div>
    </>
  );
}
