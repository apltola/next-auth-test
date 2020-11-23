import { useSession } from 'next-auth/client';

export default function IndexPage() {
  const [session, loading] = useSession();
  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-center text-accent-1">
          Survey App
        </h1>
      </div>
    </div>
  );
}
