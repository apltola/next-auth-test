import extractSessionToken from '../../helpers/extractSessionToken';
import requireAuth from '../../helpers/requireAuth';
import buildApiClient from '../../helpers/buildApiClient';
import SurveyGrid from '../../components/surveyGrid';

export default function SurveyOverview({ surveys, error, token }) {
  return (
    <div>
      <div className="text-center text-red-500 font-bold">{error}</div>
      <h1 className="text-3xl font-bold text-center">Your surveys</h1>
      <SurveyGrid surveys={surveys} sessionToken={token} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  requireAuth(ctx);
  const token = extractSessionToken(ctx);

  let surveys = [];
  let error = null;
  if (token) {
    try {
      const client = buildApiClient(token);
      const res = await client.get('/api/surveys');
      surveys = res.data;
    } catch (err) {
      error = 'Server error occurred, please try again later';
    }
  }

  return {
    props: { surveys, error, token },
  };
}
