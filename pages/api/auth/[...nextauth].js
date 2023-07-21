import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from "next-auth/providers/github"
import { clientPromise } from '../../../lib';

// const {
//     NEXTAUTH_URL,
//     MONGO_URL,
//     GITHUB_ID,
//     GITHUB_SECRET,
//     GOOGLE_ID,
//     GOOGLE_SECRET
// } = process.env

console.info('setting up auth:', process.env.EMAIL_SERVER_HOST, process.env.EMAIL_FROM);
export const authOptions = {
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
	adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)
