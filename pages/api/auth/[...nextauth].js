import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

const {
    NEXTAUTH_URL,
    MONGO_URL,
    GITHUB_ID,
    GITHUB_SECRET,
    GOOGLE_ID,
    GOOGLE_SECRET
} = process.env

const options = {
    site: NEXTAUTH_URL,
    providers: [
        Providers.Google({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        }),
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
    database: MONGO_URL,
    pages: {
        signIn: '../../auth/signin',
        error: '../../auth/error',
        verifyRequest: '../../auth/verify-request'
    }
}

export default (req, res) => NextAuth(req, res, options)
