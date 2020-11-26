import { useContext, useEffect } from 'react';
import { Context as ErrorContext } from '../../context/errorContext';
import extractSessionToken from '../../helpers/extractSessionToken';
import requireAuth from '../../helpers/requireAuth';
import buildApiClient from '../../helpers/buildApiClient';
import SurveyGrid from '../../components/surveyGrid';

export default function SurveyOverview({ surveys, errorMsg, token }) {
  const { setShowBanner } = useContext(ErrorContext);

  useEffect(() => {
    if (errorMsg) {
      setShowBanner(true, errorMsg);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Your surveys</h1>
      <SurveyGrid surveys={surveys} sessionToken={token} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  requireAuth(ctx);
  const token = extractSessionToken(ctx);

  let surveys = [];
  let errorMsg = null;
  if (token) {
    try {
      const client = buildApiClient(token);
      const res = await client.get('/api/surveys');
      surveys = res.data;
    } catch (err) {
      errorMsg =
        'Server error occurred during page load, please try again later';
    }
  }

  return {
    props: { surveys, errorMsg, token },
  };
}
