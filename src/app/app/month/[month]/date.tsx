'use client';
import { getTaskName } from '@/taskMap';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { FreeagentTimeslip } from '@/freeagent';
import { cn } from '@/app/utils/cn';
import { updateTimeslip } from '@/app/actions';

export interface TimeslipDate {
  key: string;
  date: Date;
  passed: boolean;
  isWeekend: boolean;
  inside: boolean;
  number: string;
  timeslips: FreeagentTimeslip[];
}

export type TimeslipDateWithClient = TimeslipDate & {
  isSelected: 'no' | 'single' | 'range';
};

interface DateProps {
  timeslipDate: TimeslipDateWithClient;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  small?: boolean;
}

function calcColour(timeslipDate: TimeslipDateWithClient, totalHours: number) {
  if (timeslipDate.isWeekend || !timeslipDate.passed) {
    return undefined;
  } else {
    return totalHours < 8 ? styles.missingHours : styles.completeHours;
  }
}

export function Date({
  timeslipDate,
  setStartDate,
  setEndDate,
  small,
}: DateProps) {
  const [dragging, setDragging] = useState(false);
  const totalHours = timeslipDate.timeslips.reduce(
    (total, timeslip) => total + parseFloat(timeslip.hours),
    0
  );

  const missingHours = calcColour(timeslipDate, totalHours);

  const startDragging = (e: React.DragEvent) => {
    console.log('startDragging');
    // e.preventDefault();
    e.dataTransfer.setData('text/plain', timeslipDate.key);
    setDragging(true);
    setStartDate(timeslipDate.key);
    setEndDate(timeslipDate.key);
  };

  const endDragging = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dragEnter = (td: TimeslipDate) => (e: React.DragEvent) => {
    console.log('dragEnter');
    e.preventDefault();
    setEndDate(td.key);
  };

  const drop = (td: TimeslipDate) => (e: React.DragEvent) => {
    e.preventDefault();
    console.log('dropped on ' + td.date);
  };

  const click = () => {
    if (timeslipDate.isSelected === 'single') {
      setStartDate('');
      setEndDate('');
      return;
    }
    setStartDate(timeslipDate.key);
    setEndDate(timeslipDate.key);
  };

  return (
    <div
      onDragOver={dragOver}
      onDragEnter={dragEnter(timeslipDate)}
      onDrop={drop(timeslipDate)}
      className={cn(
        styles.day,
        timeslipDate.isSelected !== 'no' ? styles.selected : undefined,
        dragging ? styles.dragging : undefined,
        small ? styles.smallWeekend : undefined
      )}
    >
      <div
        onClick={click}
        onDragStart={startDragging}
        onDragEnd={endDragging}
        draggable
      >
        {true && (
          <>
            <div
              className={cn(
                styles.dayBlockTop,
                timeslipDate.inside ? styles.inside : styles.outside
              )}
            >
              {small ? (
                <>
                  <div>{timeslipDate.number}</div>
                  <div>&nbsp;&nbsp;&nbsp;</div>
                </>
              ) : (
                <>
                  <div>{timeslipDate.number}</div>
                  <div>{totalHours}h</div>
                </>
              )}
            </div>
            <div
              className={cn(
                styles.dayBlockBottom,
                missingHours,
                small ? styles.smallWeekend : undefined
              )}
            >
              {small ? (
                <>{totalHours}h</>
              ) : (
                // <NoTimeslips />
                <>
                  {timeslipDate.timeslips.length === 0 ? (
                    <NoTimeslips />
                  ) : (
                    // timeslipDate.timeslips.map((timeslip) => (
                    //   <Timeslip key={timeslip.url} timeslip={timeslip} />
                    // ))
                    <Timeslips timeslips={timeslipDate.timeslips} />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Timeslips({ timeslips }: { timeslips: FreeagentTimeslip[] }) {
  const [hours, setHours] = useState(
    timeslips.map((timeslip) => timeslip.hours)
  );

  const changed = hours.some((hour, i) => hour !== timeslips[i].hours);

  const apply = async () => {
    const changed = timeslips
      .map((t, i) => ({ t, h: hours[i] }))
      .filter(({ t, h }) => t.hours !== h);
    for (const { t, h } of changed) {
      await updateTimeslip(t.url, h);
    }
  };
  const cancel = () => {
    setHours(timeslips.map((timeslip) => timeslip.hours));
  };

  return (
    <>
      {timeslips.map((timeslip, i) => (
        <div className={styles.timeslip} key={timeslip.url}>
          <div>{getTaskName(timeslip.task)}</div>
          <select
            className={styles.clearSelect}
            value={hours[i]}
            onChange={(e) =>
              setHours(
                hours.map((hour, j) => (i === j ? e.target.value : hour))
              )
            }
          >
            <option value="8.0">8h</option>
            <option value="4.0">4h</option>
            <option value="2.0">2h</option>
            <optgroup label="---"></optgroup>
            <option value="delete">⌫</option>
          </select>
        </div>
      ))}
      {changed && (
        <div className={styles.timeslip}>
          <button onClick={() => cancel()}>Cancel</button>
          <button onClick={() => apply()}>Apply</button>
        </div>
      )}
    </>
  );
}

function NoTimeslips() {
  return <div className={styles.noTimeslips}>No timeslips</div>;
}
