import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Context as SurveyContext } from '../../context/surveyContext';
import { Context as ErrorContext } from '../../context/errorContext';
import buildApiClient from '../../helpers/buildApiClient';
import extractSessionToken from '../../helpers/extractSessionToken';
import requireAuth from '../../helpers/requireAuth';
import DotLoader from 'react-spinners/PulseLoader';

export default function SurveyReviewPage({ token }) {
  const { state, resetData } = useContext(SurveyContext);
  const { setShowBanner } = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendSurvey = async () => {
    setLoading(true);
    try {
      const client = buildApiClient(token);
      await client.post('/api/surveys', { ...state });
      router.push('/surveys/overview');
      resetData();
    } catch (error) {
      setLoading(false);
      setShowBanner(
        true,
        'Server error occurred during survey creation, please try again later'
      );
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold">
          Please confirm your survey
        </h1>
        <h2 className="pt-4">Your email will look roughly like this</h2>
        {/* <div>{JSON.stringify(state, null, 2)}</div>
        <div>token: {token}</div> */}
        <div className="mt-8 mb-6 border rounded-md shadow-sm">
          <div className="bg-gray-200 py-2 px-4">
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
                  className="border border-gray-500 px-4 py-1 rounded-md m-2 cursor-default"
                  disabled
                >
                  <span>Yes</span>
                </button>
                <button
                  className="border border-gray-500 px-4 py-1 rounded-md m-2 cursor-default"
                  disabled
                >
                  <span>No</span>
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
        <div className="pt-6 flex justify-between items-center">
          <Link href="/surveys/new">
            <a> &larr; Go Back</a>
          </Link>
          <button
            className="flex items-center justify-center border-transparent text-sm text-white font-medium py-2 px-10 bg-ultramarine-1 hover:bg-ultramarine-2 rounded-md"
            onClick={handleSendSurvey}
          >
            {loading ? (
              <DotLoader loading={loading} size={10} color="white" />
            ) : (
              <span>
                <FontAwesomeIcon icon="envelope" className="mr-2" />
                Send survey!
              </span>
            )}
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
