import Nav from '../components/nav';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function IndexPage() {
  const [session, loading] = useSession();

  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Next.js + Tailwind CSS 2.0
        </h1>
      </div>
      {!session && (
        <div className="text-center">
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </div>
      )}
      {session && (
        <div className="text-center">
          Signed in as {session.user.name} <br />
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
