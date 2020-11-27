import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function MobileMenu({ show, session, close, signOut }) {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{ opacity: '.95' }}
      className="absolute top-1 inset-x-0 pt-2 pb-8 md:hidden bg-gray-900 text-white z-50"
    >
      <div className="flex flex-col items-center">
        {!session && (
          <div className="flex flex-col items-start">
            <Link href="/auth/signin">
              <button onClick={close}>
                <a className="text-white text-center text-lg font-bold">
                  <FontAwesomeIcon
                    icon="sign-in-alt"
                    className="mr-6"
                    size="lg"
                  />
                  Sign in
                </a>
              </button>
            </Link>
            <Link href="/auth/signup">
              <button onClick={close} className="mt-8">
                <a className="text-white text-center text-lg font-bold">
                  <FontAwesomeIcon
                    icon="user-plus"
                    className="mr-4"
                    size="lg"
                  />
                  Sign up
                </a>
              </button>
            </Link>
          </div>
        )}
        {session && (
          <div className="flex flex-col items-start">
            <Link href="/surveys/overview">
              <button onClick={close}>
                <a className="text-white text-center text-lg font-bold">
                  <FontAwesomeIcon icon="poll" className="mr-4" size="lg" />
                  Surveys overview
                </a>
              </button>
            </Link>
            <Link href="/surveys/new">
              <button onClick={close} className="mt-8">
                <a className="text-white text-center text-lg font-bold">
                  <FontAwesomeIcon
                    icon="plus-square"
                    className="mr-4"
                    size="lg"
                  />
                  New survey
                </a>
              </button>
            </Link>
            <Link href="/auth/signup">
              <button onClick={signOut} className="mt-8">
                <a className="text-white text-center text-lg font-bold">
                  <FontAwesomeIcon
                    icon="sign-out-alt"
                    className="mr-4"
                    size="lg"
                  />
                  Logout {session.user.name}
                </a>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
