import SurveyCard from './surveyCard';

export default function SurveyGrid({ surveys }) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center pt-10">
      {surveys.map((survey) => (
        <SurveyCard key={survey.id} survey={survey} />
      ))}
    </div>
  );
}
