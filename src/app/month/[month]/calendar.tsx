'use client';

import styles from './page.module.css';
import dayjs from 'dayjs';
import { TimeslipDateWithClient } from './date';
import { Date } from './date';
import { useDateSelect } from './useDateSelect';
import { Dispatch, SetStateAction } from 'react';

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
  return (
    <>
      <div className={styles.calendar}>
        {DAYS.map((day, i) => (
          <div key={i} className={styles.dayHeading}>
            <div></div>
            <div>{day}</div>
            <div>{DAYS_FULL[i].substring(1)}</div>
          </div>
        ))}
        {dates.map((date) => {
          return (
            <div key={date.key}>
              <Date
                timeslipDate={date}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
