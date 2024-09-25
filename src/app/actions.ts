'use server';

import {
  CreateFreeagentTimeslip,
  freeagentDelete,
  freeagentPost,
  freeagentPut,
} from '@/freeagent';

import { revalidatePath } from 'next/cache';

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

  await revalidatePath('/v2/timeslips');
}

export async function updateTimeslip(url: string, newValue: string) {
  if (newValue === 'delete') {
    await freeagentDelete(url);
  } else {
    await freeagentPut(url, { hours: newValue });
  }

  await revalidatePath('/v2/timeslips');
}
