import { cookies } from 'next/headers';

export default function Cookies() {
  const cookieJar = cookies();
  const allCookies = cookieJar.getAll();

  return (
    <main>
      <ul>
        {allCookies.map((cookie) => (
          <li key={cookie.name}>
            {cookie.name}: {cookie.value}
          </li>
        ))}
      </ul>
    </main>
  );
}
