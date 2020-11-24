import React from 'react';
import '../styles/index.css';
import { Provider } from 'next-auth/client';
import Layout from '../components/layout';
import { NextSeo } from 'next-seo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
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
