import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/client';

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/auth/signin', label: 'Sign In' },
  { href: '/auth/signup', label: 'Sign Up' },
];

/* const authenticationLinks = [
  { href: '/auth/signin', label: 'Sign In'},
  { href: '/auth/signUp', label: 'Sign Up'},
] */

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSurveyMenu, setshowSurveyMenu] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const isAuthPage =
    router.pathname === '/auth/signin' || router.pathname === '/auth/signup';

  const renderMobileLinks = () => {
    return (
      <ul className="text-center">
        {mobileLinks.map((link) => {
          return (
            <li key={link.label} className="p-2 m-2">
              <Link href={link.href}>
                <button onClick={() => setShowMobileMenu(false)}>
                  <a className="text-white text-center text-lg">{link.label}</a>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <header className="relative bg-gray-900">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="py-1">
            <Link href="/">
              <a className="text-gray-300 hover:text-white text-xl font-medium">
                YES|NO Surveys
              </a>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {!isAuthPage && !session && (
              <React.Fragment>
                <Link href="/auth/signin">
                  <a className="whitespace-nowrap text-base font-medium text-gray-300 hover:text-white">
                    Sign in
                  </a>
                </Link>
                <Link href="/auth/signup">
                  <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ultramarine-1 hover:bg-ultramarine-2">
                    Sign up
                  </a>
                </Link>
              </React.Fragment>
            )}
            {session && (
              <React.Fragment>
                <div
                  className="relative text-white cursor-pointer"
                  onMouseEnter={() => setshowSurveyMenu(true)}
                  onMouseLeave={() => setshowSurveyMenu(false)}
                >
                  <div>
                    Surveys{' '}
                    <FontAwesomeIcon icon="caret-down" className="ml-2" />
                  </div>
                  <div className="relative">
                    {showSurveyMenu && (
                      <div className="absolute top-0 -ml-4 transform px-0 w-screen max-w-sm sm:px-0 sm:ml-0 sm:left-1/2 sm:-translate-x-1/2">
                        <div className="p-2 mt-3 bg-white text-gray-900 shadow-md rounded-lg">
                          <div className="p-4 hover:bg-gray-100 rounded-lg p-4">
                            <Link href="/surveys/overview">
                              <a>
                                <FontAwesomeIcon icon="poll" className="mr-4" />
                                Overview
                              </a>
                            </Link>
                          </div>
                          <div className="p-4 hover:bg-gray-100 rounded-lg p-4">
                            <Link href="/surveys/new">
                              <a>
                                <FontAwesomeIcon
                                  icon="plus-square"
                                  className="mr-4"
                                />
                                New Survey
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={signOut}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-ultramarine-1 hover:bg-ultramarine-2"
                >
                  Logout{' '}
                  <FontAwesomeIcon icon="sign-out-alt" className="ml-2" />
                </button>
              </React.Fragment>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              className="text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <FontAwesomeIcon icon="bars" size="lg" />
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div
          style={{ opacity: '.95' }}
          className="absolute top-0 inset-x-0 py-6 px-6 md:hidden bg-gray-900 text-white"
        >
          <div className="text-right">
            <button onClick={() => setShowMobileMenu(false)}>
              <FontAwesomeIcon icon="times" size="2x" />
            </button>
          </div>
          <div>{renderMobileLinks()}</div>
        </div>
      )}
    </header>
  );
}
