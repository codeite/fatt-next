import { FattSettings } from './fatt-settings';
import { FreeagentTask } from './freeagent';

// const taskMap: Record<string, string> = {
//   'https://api.freeagent.com/v2/tasks/5205590': 'AXA - Working',
//   'https://api.freeagent.com/v2/tasks/5234257': 'AXA - Holiday',
//   'https://api.freeagent.com/v2/tasks/5234258': 'AXA - Sickness',
// };

// export function getTaskNameOld(url: string | FreeagentTask): string {
//   if (typeof url === 'object') {
//     return taskMap[url.url] || url.name;
//   } else {
//     return taskMap[url] || url;
//   }
// }

export function getTaskName(
  url: string,
  fattSettings: FattSettings,
  tasks: FreeagentTask[]
): string;

export function getTaskName(
  url: FreeagentTask,
  fattSettings: FattSettings
): string;

export function getTaskName(
  url: FreeagentTask | string,
  fattSettings: FattSettings,
  tasks?: FreeagentTask[]
): string {
  let task: FreeagentTask | undefined;

  if (typeof url === 'object') {
    task = url;
  } else if (typeof url === 'string' && Array.isArray(tasks)) {
    task = tasks.find((t) => t.url === url);
  }

  const urlString = typeof url === 'object' ? url.url : url;
  const name = typeof url === 'object' ? url.name : task?.name || url;
  const id = urlString.split('/').pop() || '';

  return fattSettings?.tasks?.[id]?.short || name;
}

export function getTaskIcon(
  url: string | FreeagentTask,
  fattSettings: FattSettings
) {
  const urlString = typeof url === 'object' ? url.url : url;
  const id = urlString.split('/').pop() || '';

  const icon = fattSettings?.tasks?.[id]?.iconName || '';

  return <span className="material-symbols-outlined">{icon}</span>;
}
