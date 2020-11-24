import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'cookies';

export default function SurveyOverview({ surveys }) {
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
      <div>surveys.length = {surveys.length}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const cookies = new Cookies(req, res);
  const token = cookies.get(process.env.SESSION_COOKIE_NAME);

  let surveys = [];
  if (token) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });
    surveys = res.data;
  }

  return {
    props: { surveys },
  };
}
