import { csrfToken, signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../../components/authForm';
export default function SignupPage({ csrfToken }) {
  const router = useRouter();

  const onSubmit = async (e, username, password) => {
    e.preventDefault();

    await signIn('credentials', {
      username: username,
      password: password,
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      onErrorRedirect: router.pathname,
      method: 'signup',
    });
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-3xl font-bold">Sign up with new account</h1>
        <AuthForm
          onSubmit={onSubmit}
          method="signup"
          token={csrfToken}
          btnText="Sign up"
        />
        {/* <form
          onSubmit={
            onSubmit
          }
        >
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
          <button type="submit">Sign up</button>
        </form> */}
        <div className="text-red-500 pt-4 text-center">
          {router.query.error}
        </div>
      </div>
    </div>
  );
}

SignupPage.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
