import Link from 'next/link';
import { useContext } from 'react';
import { Context as SurveyContext } from '../../context/surveyContext';

export default function SurveyReviewPage() {
  const { state } = useContext(SurveyContext);

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-3xl font-bold">Please confirm your entries</h1>
        <div>{JSON.stringify(state, null, 2)}</div>
        <div className="pt-6">
          <Link href="/surveys/new">
            <a> &larr; Back to survey creation</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
