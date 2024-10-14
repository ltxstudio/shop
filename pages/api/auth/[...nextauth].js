import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home page after login
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});
