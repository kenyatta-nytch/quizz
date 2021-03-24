import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_FROM,
    GITHUB_ID,
    GITHUB_SECRET
} = process.env

const options = {
    site: process.env.NEXTAUTH_URL,
    providers: [
        Providers.Email({
            server: {
                host: EMAIL_SERVER_HOST,
                port: EMAIL_SERVER_PORT,
                auth: {
                    user: EMAIL_SERVER_USER,
                    pass: EMAIL_SERVER_PASSWORD
                },
            },
            from: EMAIL_FROM
        }),
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        })
    ],
    database: process.env.DATABASE_URL,
    pages: {
        signIn: '../../auth/signin',
        error: '../../auth/error',
        verifyRequest: '../../auth/verify-request'
    }
}

export default (req, res) => NextAuth(req, res, options)