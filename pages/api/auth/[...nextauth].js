import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
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

        /* if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')); // Redirect to error page
          //return Promise.reject('http://localhost:3000'); // Redirect to a URL
        } */
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default (req, res) => NextAuth(req, res, options);
