import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import jwt from 'next-auth/jwt';
import axios from 'axios';

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
  const { req } = ctx;
  const secret = process.env.JWT_SECRET;
  const token = await jwt.getToken({ req, secret });

  let surveys = [];
  if (token) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys`,
      {
        headers: req.headers,
      }
    );
    surveys = res.data;
  }

  return {
    props: { token, surveys },
  };
}
