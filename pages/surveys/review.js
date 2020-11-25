import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext } from 'react';
import { Context as SurveyContext } from '../../context/surveyContext';
import buildApiClient from '../../helpers/buildApiClient';
import extractSessionToken from '../../helpers/extractSessionToken';
import requireAuth from '../../helpers/requireAuth';
//import axios from 'axios';

export default function SurveyReviewPage({ token }) {
  const { state } = useContext(SurveyContext);

  const handleSendSurvey = async () => {
    try {
      const client = buildApiClient(token);
      const res = await client.post('/api/surveys', { ...state });
      /* const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys`,
        { ...state },
        {headers: {Authorization: `Bearer ${token}`,},}
      ); */
      console.log('jee? -> ', res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold">
          Please confirm your survey
        </h1>
        {/* <div>{JSON.stringify(state, null, 2)}</div>
        <div>token: {token}</div> */}
        <div className="mt-6 mb-6 border rounded-md shadow-sm">
          <div className="bg-gray-200 p-2">
            <div>subject: {state.subject}</div>
            <div className="text-sm overflow-x-scroll pb-4 pt-2">
              recipients: {state.recipients}
            </div>
          </div>
          <div className="flex justify-center p-4 bg-white rounded-md">
            <div className="bg-gray-200 flex-1 max-w-lg text-center p-4">
              <div className="whitespace-pre">{`${state.body}`}</div>
              <div className="pt-4">
                <button
                  className="border border-gray-500 px-4 py-1 rounded-md m-2"
                  disabled
                >
                  <span>Yes</span> 👍
                </button>
                <button
                  className="border border-gray-500 px-4 py-1 rounded-md m-2"
                  disabled
                >
                  <span>No</span> 👎
                </button>
              </div>
              <div
                className="mt-8 border-t text-xs pt-2"
                style={{ opacity: 0.5 }}
              >
                You received this email from{' '}
                <a href="https://yesnosurveys.vercel.app">yesnosurveys.app</a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 flex justify-between">
          <Link href="/surveys/new">
            <a> &larr; Go Back</a>
          </Link>
          <button onClick={handleSendSurvey}>
            <FontAwesomeIcon icon="envelope" className="mr-2" />
            Send survey!
          </button>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(ctx) {
  requireAuth(ctx);
  const token = extractSessionToken(ctx);

  return {
    props: {
      token: token || null,
    },
  };
}
