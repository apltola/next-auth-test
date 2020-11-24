import Cookies from 'cookies';

export default function extractSessionToken(ctx) {
  const { req, res } = ctx;
  const cookies = new Cookies(req, res);
  const token = cookies.get(process.env.SESSION_COOKIE_NAME);
  return token || null;
}
