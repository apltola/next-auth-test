import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import DotLoader from 'react-spinners/PulseLoader';

export default function AuthForm({ method, token, btnText, onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const usernameInput = useRef();

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus();
    }
  }, []);

  const isDisabled = () => {
    if (method === 'signin') {
      return !username || !password;
    } else {
      const fieldIsEmpty = !username || !password || !confirmPassword;
      return fieldIsEmpty;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (method === 'signup' && password !== confirmPassword) {
      setLoading(false);
      return setError('Passwords are not matching');
    } else if (username.length < 2 || username.length > 20) {
      setLoading(false);
      return setError('Username must be between 2-20 characters long');
    } else if (password.length < 4) {
      setLoading(false);
      return setError('Password must be at least 4 characters long');
    }

    return onSubmit(e, username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={token} />
        <div className="pt-6">
          <label className="block pb-1" htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
            type="text"
            name="username"
            ref={usernameInput}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="pt-4">
          <label className="block pb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {method === 'signup' && (
          <div className="pt-4">
            <label className="block pb-1" htmlFor="confirmpassword">
              Confirm Password
            </label>
            <input
              className="w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-ultramarine-1"
              type="password"
              name="confirmpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center mt-6 w-full border-transparent text-sm text-white font-medium py-2 px-10 bg-ultramarine-1 hover:bg-ultramarine-2 rounded-md"
            type="submit"
            disabled={isDisabled()}
            style={{ cursor: isDisabled() ? 'not-allowed' : 'pointer' }}
          >
            {loading ? (
              <DotLoader loading={loading} size={10} color="white" />
            ) : (
              btnText
            )}
          </button>
        </div>
        <div className="text-center pt-4 text-gray-600">
          <span className="mr-2">
            {method === 'signup'
              ? 'Already registered?'
              : "Don't have an account?"}
          </span>
          <Link href={`/auth/${method === 'signup' ? 'signin' : 'signup'}`}>
            <a className="hover:text-ultramarine-1">
              {method === 'signup' ? 'Sign in' : 'Sign up'}
            </a>
          </Link>
        </div>
        {error && <div className="text-center text-red-500 pt-4">{error}</div>}
      </form>
    </div>
  );
}
