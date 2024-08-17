import { FreeagentTask } from './freeagent';

const taskMap: Record<string, string> = {
  'https://api.freeagent.com/v2/tasks/5205590': 'AXA - Working',
  'https://api.freeagent.com/v2/tasks/5234257': 'AXA - Holiday',
  'https://api.freeagent.com/v2/tasks/5234258': 'AXA - Sickness',
};

export function getTaskName(url: string | FreeagentTask): string {
  if (typeof url === 'object') {
    return taskMap[url.url] || url.name;
  } else {
    return taskMap[url] || url;
  }
}
