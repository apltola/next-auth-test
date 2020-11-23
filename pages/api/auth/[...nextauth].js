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
          placeholder: 'username...',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('credentials --> ', credentials);
        //const user = { id: 1, name: 'allu', email: 'allu@gmail.com' };
        try {
          const { data } = await axios.post(
            'https://surveys-api-5xzb7.ondigitalocean.app/api/auth/signin2',
            {
              username: credentials.username,
              password: credentials.password,
            }
          );
          console.log('res.data -> ', data);
          const user = { id: data.id, name: data.username, email: null };
          return Promise.resolve(user);
        } catch (error) {
          return Promise.reject(
            `${credentials.onErrorRedirect}?error=${encodeURIComponent(
              'Incorrect username or password'
            )}`
          );
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default (req, res) => NextAuth(req, res, options);
