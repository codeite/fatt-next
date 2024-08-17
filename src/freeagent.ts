import { headers } from 'next/headers';

interface Tokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

const oathId = process.env.OAUTH_ID;
const oauthSecret = process.env.OAUTH_SECRET;

export async function refreshAccessTokens(
  refreshToken: string
): Promise<Tokens | undefined> {
  const r = await fetch('https://api.freeagent.com/v2/token_endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${oathId}:${oauthSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  });

  if (!r.ok) {
    const body = await r.text();
    console.error('Error:', body);
    throw new Error(body);
  }

  const tokens: Tokens = await r.json();

  console.log('tokens:', tokens);

  return tokens;
}

async function getAccessToken() {
  // const cookieStore = cookies();
  // const token = cookieStore.get('access_token')?.value;
  // return token;
  // console.log('headers:', Array.from(headers().entries()));
  const xAccessToken = headers().get('x-access-token');
  return xAccessToken;
}

export async function freeagentGet<T>(path: string) {
  if (path.startsWith('http')) {
    const pathStart = path.indexOf('/v2/');
    path = path.substring(pathStart);
  }

  console.log(`freeagentGet path: ${path}`);
  const token = await getAccessToken();

  const r = await fetch(`https://api.freeagent.com/${path}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!r.ok) {
    const body = await r.text();
    console.error('Error:', body);
    throw new Error(body);
  }

  return r.json() as T;
}

export async function freeagentPost<T>(path: string, body: object) {
  if (path.startsWith('http')) {
    const pathStart = path.indexOf('/v2/');
    path = path.substring(pathStart);
  }

  console.log('body:', body);

  console.log(`freeagentPost path: ${path}`);
  const token = await getAccessToken();

  const r = await fetch(`https://api.freeagent.com/${path}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const body = await r.text();
    console.error('Error:', body);
    throw new Error(body);
  }

  return r.json() as T;
}

export interface CreateFreeagentTimeslip {
  task: string;
  user: string;
  project: string;
  dated_on: string;
  hours: string;
}

export interface TimeslipResponse {
  timeslips: FreeagentTimeslip[];
}

export interface FreeagentTimeslip {
  url: string;
  user: string;
  project: string;
  task: string;
  billed_on_invoice: string;
  dated_on: string;
  hours: string;
  updated_at: string;
  created_at: string;
}

export interface TasksResponse {
  tasks: FreeagentTask[];
}

export interface FreeagentTask {
  url: string;
  project: string;
  name: string;
  is_billable: boolean;
  billing_rate: string;
  billing_period: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectsResponse {
  projects: FreeagentProject[];
}

export interface FreeagentProject {
  url: string;
  name: string;
  contact: string;
  contact_name: string;
  currency: string;
  created_at: string;
  updated_at: string;
  budget: number;
  is_ir35: false;
  status: string;
  budget_units: string;
  normal_billing_rate: string;
  hours_per_day: string;
  uses_project_invoice_sequence: boolean;
  billing_period: string;
  include_unbilled_time_in_profitability: boolean;
}
