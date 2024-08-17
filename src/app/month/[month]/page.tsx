'use server';
import {
  freeagentGet,
  ProjectsResponse,
  TasksResponse,
  TimeslipResponse,
} from '@/freeagent';
import dayjs from 'dayjs';
import { TimeslipDate } from './date';
import { ClientPage } from './client-page';

export default async function Home({ params }: { params: { month: string } }) {
  const firstDay = dayjs(`${params.month}-01`);
  const prefixDays = (firstDay.day() + 6) % 7;
  const daysInMonth = firstDay.daysInMonth();
  const weeks = Math.ceil((prefixDays + daysInMonth) / 7);
  const daysOnScreen = weeks * 7;
  const calendarStart = firstDay.add(-prefixDays, 'day');
  const calendarEnd = calendarStart.add(daysOnScreen, 'day');

  const requestUrl = `/v2/timeslips?from_date=${calendarStart.format(
    'YYYY-MM-DD'
  )}&to_date=${calendarEnd.format('YYYY-MM-DD')}&view=all`;
  const timeslipsResponse = await freeagentGet<TimeslipResponse>(requestUrl);
  const timeslips = timeslipsResponse.timeslips;

  const dates = [...Array(daysOnScreen)].map((_, i) => {
    const date = calendarStart.add(i, 'day');

    const timeslipDate: TimeslipDate = {
      key: date.format(),
      date: date.toDate(),
      inside: date.month() === firstDay.month(),
      passed: date.isBefore(dayjs()),
      isWeekend: date.day() === 0 || date.day() === 6,
      number: date.format('Do'),
      timeslips: timeslips.filter(
        (timeslip) => timeslip.dated_on === date.format('YYYY-MM-DD')
      ),
    };

    return timeslipDate;
  });

  const tasks = await freeagentGet<TasksResponse>(`/v2/tasks?view=active`);
  const projects = await freeagentGet<ProjectsResponse>(`/v2/projects`);

  return (
    <main>
      <section>
        <p>
          Month {params.month} <br />
          prefixDays: {prefixDays} <br />
          calendarStart: {calendarStart.format('YYYY-MM-DD')} <br />
          weeks: {weeks} <br />
          daysOnScreen: {daysOnScreen} <br />
        </p>
      </section>
      <ClientPage
        tasks={tasks.tasks}
        projects={projects.projects}
        dates={dates}
      />
    </main>
  );
}
