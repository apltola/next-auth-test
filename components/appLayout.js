import { useSession } from 'next-auth/client';
import Header from './header';

export default function AppLayout({ children }) {
  const [session, loading] = useSession();

  return (
    <div style={{ minHeight: '100vh' }} className="flex flex-col">
      <Header />
      <main
        style={{ maxWidth: '1600px' }}
        className="py-20 pl-4 pr-4 pb-20 w-screen mx-auto flex-grow"
      >
        {children}
      </main>
      <footer className="p-8 border text-center text-gray-500">
        <div>allu © 2020</div>
        <div>auth: {JSON.stringify(session, null, 2)}</div>
      </footer>
    </div>
  );
}
