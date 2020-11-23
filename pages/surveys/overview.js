import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import jwt from 'next-auth/jwt';

export default function SurveyOverview({ token }) {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('overview session -> ', session);
    console.log('overview loading -> ', loading);

    if (!session && !loading) {
      router.push('/');
    } else {
    }
  }, [session, loading]);
  return (
    <div>
      overview
      <div>{JSON.stringify(token, null, 2)}</div>
    </div>
  );
}

export async function getServerSideProps(p) {
  //console.log('hmmmmm', p.req);
  const { req } = p;
  const secret = process.env.JWT_SECRET;
  console.log('secret ==> ', secret);
  const token = await jwt.getToken({ req, secret });
  console.log('JSON Web Token ==> ', token);

  return {
    props: { token },
  };
}
