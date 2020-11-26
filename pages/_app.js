import React from 'react';
import '../styles/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider as AuthProvider } from 'next-auth/client';
import { Provider as SurveyProvider } from '../context/surveyContext';
import { Router } from 'next/router';
import { NextSeo } from 'next-seo';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCaretDown,
  faCircle,
  faEnvelope,
  faExclamationCircle,
  faHome,
  faInfoCircle,
  faPlusSquare,
  faPoll,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faTrashAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/layout';

library.add(
  faBars,
  faTimes,
  faCaretDown,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faPoll,
  faPlusSquare,
  faHome,
  faInfoCircle,
  faExclamationCircle,
  faEnvelope,
  faCircle,
  faTrashAlt
);

function MyApp({ Component, pageProps }) {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  NProgress.configure({ showSpinner: false });

  return (
    <React.Fragment>
      <NextSeo
        title="Yes|No Surveys"
        description="Collect feedback with yes/no questions"
      />
      <AuthProvider session={pageProps.session}>
        <SurveyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SurveyProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default MyApp;
