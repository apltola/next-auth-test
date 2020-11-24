import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import jwt from 'next-auth/jwt';
import axios from 'axios';
import Cookies from 'cookies';

export default function SurveyOverview({ token, surveys }) {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && !loading) {
      router.push('/');
    }
  }, [session, loading]);

  return (
    <div>
      <h1>overview page</h1>
      <div>token: {JSON.stringify(token, null, 2)}</div>
      <div>surveys.length = {surveys.length}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET });
  const cookies = new Cookies(req, res);
  const cookieName =
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';
  const token2 = cookies.get(cookieName);
  console.log('sessiontoken --> ', token2);
  console.log('process.env.NODE_ENV --> ', process.env.NODE_ENV);

  let surveys = [];
  if (token2) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer: ${token2}`,
      },
    });
    surveys = res.data;
  }

  return {
    props: { token, surveys },
  };
}
