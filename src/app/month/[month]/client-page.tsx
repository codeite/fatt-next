'use client';
import { FreeagentProject, FreeagentTask } from '@/freeagent';
import { TimeslipDate, TimeslipDateWithClient } from './date';
import styles from './page.module.css';
import { TaskPicker } from './taskPicker';
import { Calendar } from './calendar';
import { useDateSelect } from './useDateSelect';
import { createTimeslips } from '@/app/actions';
import { useState } from 'react';

interface ClientPageProps {
  tasks: FreeagentTask[];
  projects: FreeagentProject[];
  dates: TimeslipDate[];
}

export function ClientPage({ tasks, projects, dates }: ClientPageProps) {
  const [selectedDate, setStartDate, setEndDate, inRange, datesArray] =
    useDateSelect();
  const [taskAndProject, setTaskAndProject] = useState('');
  const [hours, setHours] = useState('8');

  const [selectedTask, selectedProject] = taskAndProject.split('|');

  const datesWithClient: TimeslipDateWithClient[] = dates.map((date) => {
    const isInRange = inRange(date.key);
    const isSelected = date.isWeekend
      ? isInRange === 'single'
        ? 'single'
        : 'no'
      : isInRange;

    return {
      ...date,
      isSelected: inRange(date.key),
    };
  });

  return (
    <>
      <div className={styles.actionBar}>
        <TaskPicker
          tasks={tasks}
          projects={projects}
          value={taskAndProject}
          onChange={setTaskAndProject}
        />
        <select value={hours} onChange={(e) => setHours(e.target.value)}>
          <option value="8.0">8</option>
          <option value="4.0">4</option>
          <option value="2.0">2</option>
        </select>
        <button
          onClick={() => {
            createTimeslips(datesArray, selectedTask, selectedProject, hours);
          }}
        >
          Add to {selectedDate}
        </button>
      </div>
      <Calendar
        dates={datesWithClient}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </>
  );
}
