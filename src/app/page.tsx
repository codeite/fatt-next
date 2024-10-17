import Image from 'next/image';
import styles from './page.module.css';
import { PageHeader } from '@/components/page-header';

// 58XDKG7_wWAD-YVcJ0v5KQ
const oathId = process.env.OAUTH_ID;

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000';
const callbackUrl = vercelUrl?.includes('localhost')
  ? `http://${vercelUrl}/api/callback`
  : `https://${vercelUrl}/api/callback`;

export default function Home() {
  const href = `https://api.freeagent.com/v2/approve_app?client_id=${oathId}&response_type=code&redirect_uri=${callbackUrl}`;
  return (
    <main className={styles.main}>
      <PageHeader />
      <div>
        <a href={href}>Login</a>
        <div>vercelUrl: {vercelUrl}</div>
        <div>callbackUrl: {callbackUrl}</div>
      </div>
    </main>
  );
}
