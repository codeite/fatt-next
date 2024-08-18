'use server';

import dayjs from 'dayjs';
import { redirect } from 'next/navigation';

const ThisMonthPage = () => {
  const today = dayjs();
  const month = today.format('YYYY-MM');

  return redirect(`/month/${month}`);
};

export default ThisMonthPage;
