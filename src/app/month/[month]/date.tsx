'use client';
import { getTaskName } from '@/taskMap';
import styles from './page.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { FreeagentTimeslip } from '@/freeagent';
import { cn } from '@/app/utils/cn';

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
}

function calcColour(timeslipDate: TimeslipDateWithClient, totalHours: number) {
  if (timeslipDate.isWeekend || !timeslipDate.passed) {
    return undefined;
  } else {
    return totalHours < 8 ? styles.missingHours : styles.completeHours;
  }
}

export function Date({ timeslipDate, setStartDate, setEndDate }: DateProps) {
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
        dragging ? styles.dragging : undefined
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
              <div>{timeslipDate.number}</div>
              <div>{totalHours}h</div>
            </div>
            <div className={cn(styles.dayBlockBottom, missingHours)}>
              {timeslipDate.timeslips.length === 0 ? (
                <NoTimeslips />
              ) : (
                timeslipDate.timeslips.map((timeslip) => (
                  <div key={timeslip.url} className={styles.timeslip}>
                    <div>{getTaskName(timeslip.task)}</div>
                    <div>{parseFloat(timeslip.hours)}h</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function NoTimeslips() {
  return <div className={styles.noTimeslips}>No timeslips</div>;
}
