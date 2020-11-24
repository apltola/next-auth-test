import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('credentials --> ', credentials);
        try {
          const { data } = await axios.post(
            `https://surveys-api-5xzb7.ondigitalocean.app/api/auth/${credentials.method}2`,
            {
              username: credentials.username,
              password: credentials.password,
            }
          );
          console.log('res.data -> ', data);
          const user = { id: data.id, name: data.username, email: null };
          return Promise.resolve(user);
        } catch (error) {
          const msg =
            credentials.method === 'signup'
              ? 'Error occurred during sign up'
              : 'Incorrect username or password';
          return Promise.reject(
            `${credentials.onErrorRedirect}?error=${encodeURIComponent(msg)}`
          );
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.JWT_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
