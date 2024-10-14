import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import dbConnect from '../../../lib/mongodb';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        await dbConnect();
        // Add your own authentication logic here
      },
    }),
  ],
  database: process.env.DATABASE_URL,
});
