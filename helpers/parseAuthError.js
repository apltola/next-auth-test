export default function parseAuthError(error) {
  if (!error.response) {
    return 'server-error';
  }

  if (!error.response.data) {
    return 'server-error';
  }

  if (
    error.response.data === 'incorrect-credentials' ||
    error.response.data === 'username-reserved'
  ) {
    return error.response.data;
  }

  return 'application-error';
}
