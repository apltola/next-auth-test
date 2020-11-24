import extractSessionToken from '../../helpers/extractSessionToken';
import requireAuth from '../../helpers/requireAuth';
import buildApiClient from '../../helpers/buildApiClient';

export default function SurveyOverview({ surveys }) {
  return (
    <div>
      <h1>overview page</h1>
      <div>surveys.length = {surveys.length}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  requireAuth(ctx);
  const token = extractSessionToken(ctx);

  let surveys = [];
  if (token) {
    const client = buildApiClient(token);
    const res = await client.get('/api/surveys');
    surveys = res.data;
  }

  return {
    props: { surveys },
  };
}
