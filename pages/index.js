import { useContext, useEffect } from 'react';
import { Context as ErrorContext } from '../context/errorContext';
import extractSessionToken from '../helpers/extractSessionToken';
import LandingPageContent from '../components/landingPageContent';
import buildApiClient from '../helpers/buildApiClient';
import Dashboard from '../components/dashboard';

export default function LandingPage({ showDashboard, user, errorMsg }) {
  const { setShowBanner } = useContext(ErrorContext);

  useEffect(() => {
    if (errorMsg) {
      setShowBanner(true, errorMsg);
    }
  }, []);

  if (showDashboard) {
    return <Dashboard user={user} />;
  }

  return <LandingPageContent />;
}

export async function getServerSideProps(ctx) {
  let user = {};
  let errorMsg = '';
  const token = extractSessionToken(ctx);
  if (token) {
    try {
      const client = buildApiClient(token);
      const res = await client.get('/api/user');
      user = res.data;
    } catch (error) {
      console.log(error);
      errorMsg =
        'Server error occurred during page load, please try again later';
    }
  }

  return {
    props: {
      showDashboard: token ? true : false,
      user,
      errorMsg,
    },
  };
}
