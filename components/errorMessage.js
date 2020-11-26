export default function ErrorMessage({ error }) {
  if (!error) {
    return null;
  }

  const render = () => {
    switch (error) {
      case 'server-error':
        return 'Server error occurred, please try again later';

      case 'incorrect-credentials':
        return 'Incorrect username or password';

      case 'username-reserved':
        return 'Username already taken';

      default:
        return 'Something went wrong, try again later';
    }
  };

  return <div className="text-red-500 pt-4 text-center">{render()}</div>;
}
