import styles from '../styles/landing.module.css';
import Link from 'next/link';

export default function LandingPageContent() {
  return (
    <div className="flex-1 flex flex-col border pt-20 lg:pt-10">
      <div
        className="flex flex-col lg:flex-row mx-auto"
        style={{ maxWidth: '1600px' }}
      >
        <div
          className={`${styles.heroLeft} flex-1 flex flex-col items-center justify-center pb-12 lg:pb-0`}
        >
          <div className="text-gray-900 pl-0">
            <h1
              className={`${styles.title} text-4xl md:text-5xl tracking-tight font-extrabold`}
            >
              <span className="block">Collect data with</span>
              <span className="block text-ultramarine-2">yes-no questions</span>
            </h1>
            <div className="pt-10 pb-2 lg:pb-0 font-bold">
              <Link href="/auth/signup">
                <a className="hover:text-ultramarine-1">Create new account</a>
              </Link>{' '}
              ...or{' '}
              <Link href="/auth/signin">
                <a className="hover:text-ultramarine-1">sign in</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-0 text-right">
          <img
            src="/email.svg"
            alt="email vector"
            style={{ width: '100%', maxWidth: '1000px', maxHeight: '600px' }}
          />
        </div>
      </div>
      <div className="flex-grow pt-8 pb-20 mt-20 text-center bg-gray-200">
        <h2 className="font-extrabold text-3xl">How it works</h2>
        <p className="text-lg pt-4 font-medium">
          1. Create your email survey with a list of recipients
        </p>
        <p className="text-lg pt-4 font-medium">
          2. Send your survey and follow results in real-time
        </p>
      </div>
    </div>
  );
}
