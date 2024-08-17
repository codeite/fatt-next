import { freeagentGet, ProjectsResponse, TasksResponse } from '@/freeagent';
import styles from './page.module.css';

export default async function Tasks({ params }: { params: { month: string } }) {
  const tasks = await freeagentGet<TasksResponse>(`/v2/tasks?view=active`);
  const projects = await freeagentGet<ProjectsResponse>(
    `/v2/projects?view=active`
  );

  return (
    <main className={styles.main}>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </main>
  );
}
