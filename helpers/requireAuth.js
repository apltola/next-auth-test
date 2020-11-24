import jwt from 'next-auth/jwt';

export default async function requireAuth(ctx) {
  const { req, res } = ctx;
  const session = await jwt.getToken({ req, secret: process.env.JWT_SECRET });
  if (!session) {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  }
}
