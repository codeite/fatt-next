'use client';

import { FreeagentProject, FreeagentTask } from '@/freeagent';
import { getTaskName } from '@/taskMap';
import styles from './page.module.css';
import { FattSettings } from '@/fatt-settings';

interface TaskPickerProps {
  tasks: FreeagentTask[];
  projects: FreeagentProject[];
  value: string;
  onChange: (value: string) => void;
  fattSettings: FattSettings;
}

export function TaskPicker({
  tasks,
  projects,
  value,
  onChange,
  fattSettings,
}: TaskPickerProps) {
  const projectMap = projects.reduce((map, project) => {
    map[project.url] = project.name;
    return map;
  }, {} as Record<string, string>);

  const tasksByProject = tasks.reduce((map, task) => {
    if (!map[task.project]) {
      map[task.project] = [];
    }
    map[task.project].push(task);
    return map;
  }, {} as Record<string, FreeagentTask[]>);

  const tasksByProjectName = Object.entries(tasksByProject).reduce(
    (map, [projectUrl, tasks]) => {
      map[projectMap[projectUrl]] = tasks;
      return map;
    },
    {} as Record<string, FreeagentTask[]>
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.newEntry}
    >
      <option>Select a task</option>
      {Object.entries(tasksByProjectName).map(([projectName, tasks]) => (
        <optgroup label={projectName} key={projectName}>
          {tasks.map((task) => (
            <option key={task.url} value={`${task.url}|${task.project}`}>
              {getTaskName(task, fattSettings)}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
