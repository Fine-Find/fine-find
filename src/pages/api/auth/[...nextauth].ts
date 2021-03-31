import { URLSearchParams } from 'url';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// TODO: Complete the functionality of getting a long lived token once the app is approved by Facebook
async function getLongLivedInstagramToken(access_token: any) {
  const url =
    'https://graph.instagram.com/access_token' +
    new URLSearchParams({
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      grant_type: 'ig_exchange_token',
      access_token,
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await fetch(url);
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      scope: 'user_profile',
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account && user) {
        const longLivedToken = process.env.INSTAGRAM_LONG_TOKEN;
        // TODO: Store the response in the above variable so we aren't pulling from process.env
        getLongLivedInstagramToken(account.access_token);

        return {
          ...token,
          access_token: longLivedToken,
        };
      }

      return token;
    },
    async session(session, token) {
      if (token) {
        session.accessToken = token.access_token;
      }

      return session;
    },
  },
  debug: true,
});
