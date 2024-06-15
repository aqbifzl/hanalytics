import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const getServerAuthSession = () => getServerSession(authOptions);

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 // 1h
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  theme: {
    colorScheme: "dark"
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _){
        const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env
        if (
          ADMIN_USERNAME &&
          ADMIN_PASSWORD &&
          credentials &&
          credentials.username === ADMIN_USERNAME &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return {id: ADMIN_USERNAME}
        }

        return null
      }
    })
  ],
};
