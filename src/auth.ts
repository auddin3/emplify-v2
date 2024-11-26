import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from './app/services/users'
import bcrypt from 'bcryptjs'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null

        try {
          const user = await getUserByEmail(credentials?.email as string)

          if (user) {
            const isMatch = await bcrypt.compare(credentials?.password as string, user.password)

            if (isMatch) {
              return user
            } else {
              throw new Error('Email or Password is not correct')
            }
          } else {
            throw new Error('User not found')
          }
        } catch {
          throw new Error()
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
})