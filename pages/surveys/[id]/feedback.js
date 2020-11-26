import Link from 'next/link';

export default function SurveyFeedback() {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="font-bold text-2xl">Hi there,</h1>
        <p className="text-lg pt-2">
          <span className="mr-3">Thanks for your feedback!</span>
          <span className="text-2xl">👏</span>
        </p>
        <p className="pt-12 text-lg text-ultramarine-1 hover:text-ultramarine-2">
          <Link href="/">Go to frontpage</Link>
        </p>
      </div>
    </div>
  );
}
