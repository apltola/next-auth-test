import { csrfToken, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import AuthForm from '../../components/authForm';
import ErrorMessage from '../../components/errorMessage';

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
        <ErrorMessage error={router.query.error} />
      </div>
    </div>
  );
}

SigninPage.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
