'use server';

import { CreateFreeagentTimeslip, freeagentPost } from '@/freeagent';

export async function createTimeslips(
  dates: string[],
  task: string,
  project: string,
  hours: string
) {
  const timeslips: CreateFreeagentTimeslip[] = dates.map((date) => {
    const timeslip: CreateFreeagentTimeslip = {
      task,
      user: 'https://api.freeagent.com/v2/users/91067',
      project,
      dated_on: date,
      hours,
    };

    return timeslip;
  });

  const body = {
    timeslips,
  };

  await freeagentPost('/v2/timeslips', body);
}
