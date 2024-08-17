import { freeagentGet } from '@/freeagent';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(req: NextRequest) {
  const cookies = req.cookies.getAll();
  return new Response(JSON.stringify(cookies), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
