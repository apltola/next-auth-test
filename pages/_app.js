import React from 'react';
import '../styles/index.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
