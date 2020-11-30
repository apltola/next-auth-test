import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/client';
import MobileMenu from './mobileMenu';
import ErrorBanner from './errorBanner';
import HeaderDropdown from './headerDropdown';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();

  const isAuthPage =
    router.pathname === '/auth/signin' || router.pathname === '/auth/signup';

  const accountMenuLinks = [
    {
      type: 'label',
      text: `Signed in as ${!loading && session ? session.user.name : null}`,
    },
    {
      type: 'button',
      onClick: () => signOut(),
      text: 'Sign out',
      iconName: 'sign-out-alt',
    },
  ];
  const surveyMenuLinks = [
    {
      type: 'link',
      href: '/surveys/overview',
      text: 'Overview',
      iconName: 'poll',
    },
    {
      type: 'link',
      href: '/surveys/new',
      text: 'New survey',
      iconName: 'plus-square',
    },
  ];

  return (
    <header className="relative bg-gray-900">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="py-1">
            <button onClick={() => setShowMobileMenu(false)}>
              <Link href="/">
                <a className="text-gray-300 hover:text-white text-xl font-black">
                  YES|NO Surveys
                </a>
              </Link>
            </button>
          </div>
          {!loading && (
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
                  <HeaderDropdown title="Surveys" links={surveyMenuLinks} />
                  <HeaderDropdown title="Account" links={accountMenuLinks} />
                </React.Fragment>
              )}
            </div>
          )}

          <div className="flex md:hidden">
            <button
              className="text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu && <FontAwesomeIcon icon="times" size="2x" />}
              {!showMobileMenu && <FontAwesomeIcon icon="bars" size="2x" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        show={showMobileMenu}
        session={session}
        close={() => setShowMobileMenu(false)}
        signOut={signOut}
      />

      <ErrorBanner />
    </header>
  );
}
