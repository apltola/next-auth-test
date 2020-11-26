import { csrfToken, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import AuthForm from '../../components/authForm';
import ErrorMessage from '../../components/errorMessage';
export default function SignupPage({ csrfToken }) {
  const router = useRouter();

  const onSubmit = async (e, username, password) => {
    e.preventDefault();

    await signIn('credentials', {
      username,
      password,
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      onErrorRedirect: router.pathname,
      method: 'signup',
    });
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center">
          Sign up with new account
        </h1>
        <AuthForm
          onSubmit={onSubmit}
          method="signup"
          token={csrfToken}
          btnText="Sign up"
        />
        <ErrorMessage error={router.query.error} />
      </div>
    </div>
  );
}

SignupPage.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
