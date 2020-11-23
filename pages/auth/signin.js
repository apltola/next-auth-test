import { csrfToken, signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../../components/authForm';

export default function SigninPage({ csrfToken }) {
  const router = useRouter();

  const onSubmit = async (e, username, password) => {
    e.preventDefault();
    await signIn('credentials', {
      username,
      password,
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      onErrorRedirect: router.pathname,
      method: 'signin',
    });
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <AuthForm
          onSubmit={onSubmit}
          method="signin"
          token={csrfToken}
          btnText="Sign in"
        />
        {/* <form onSubmit={onSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <input
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign in</button>
        </form> */}
        <div className="text-red-500 pt-4">{router.query.error}</div>
      </div>
    </div>
  );
}

SigninPage.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
