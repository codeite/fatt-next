import { freeagentGet } from '@/freeagent';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.pathname;

  const faPath = url.pathname.replace('/api/fa', '');

  const json = await freeagentGet(faPath);

  return new Response(JSON.stringify(json), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const path = url.pathname;

//   const cookies = req.cookies;
//   const token = cookies.get('access_token')?.value;

//   const query = url.searchParams;
//   const appendQuery = query.toString() ? '?' + query.toString() : '';

//   const faPath = url.pathname.replace('/api/fa', '');

//   console.log('token:', token);
//   const r = await fetch(`https://api.freeagent.com/${faPath}${appendQuery}`, {
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   });

//   if (!r.ok) {
//     const body = await r.text();

//     return new Response(body, { status: r.status });
//   }

//   const body = await r.text();

//   return new Response(body, {
//     status: r.status,
//     headers: {
//       'Content-Type': r.headers.get('Content-Type') || 'application/json',
//     },
//   });
// }
