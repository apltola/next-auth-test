import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Header from './header';

export default function AppLayout({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();

  const isFeedbackPage = router.pathname.includes('/feedback');
  const isLandingPage = router.pathname === '/';
  const mainStyles = isLandingPage
    ? 'flex flex-grow w-screen mx-auto'
    : 'flex-grow py-10 px-4 pb-20 w-screen mx-auto';

  return (
    <div style={{ minHeight: '100vh' }} className="flex flex-col">
      {!isFeedbackPage && <Header />}
      <main
        style={{ maxWidth: isLandingPage ? 'initial' : '1600px' }}
        className={mainStyles}
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
