import Link from 'next/link';
import SurveyCard from './surveyCard';

export default function SurveyGrid({ surveys, sessionToken }) {
  if (surveys.length === 0) {
    return (
      <div className="text-center pt-10">
        <div>Nothing here yet...</div>
        <div className="pt-4">
          Try{' '}
          <Link href="/surveys/new">
            <a className="text-ultramarine-1 hover:text-ultramarine-2">
              creating a new survey
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center pt-10">
      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          survey={survey}
          sessionToken={sessionToken}
        />
      ))}
    </div>
  );
}
