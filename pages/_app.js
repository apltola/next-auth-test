import React from 'react';
import '../styles/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'next-auth/client';
import { NextSeo } from 'next-seo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Router } from 'next/router';
import Layout from '../components/layout';
import {
  faBars,
  faCaretDown,
  faCoffee,
  faHome,
  faPlusSquare,
  faPoll,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faCoffee,
  faBars,
  faTimes,
  faCaretDown,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faPoll,
  faPlusSquare,
  faHome
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
        description="Collect feedback with yes|no questions"
      />
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
