import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { joinScopes } from "../../../../lib/utils";
import {
  USER_EMAIL,
  USER_PROFILE,
  YOUTUBE_READONLY,
  YOUTUBE_UPLOAD,
} from "../../../../lib/constants";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_WEB_CLIENT_ID!,
      clientSecret: process.env.OAUTH_WEB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: joinScopes(
            USER_EMAIL,
            USER_PROFILE,
            YOUTUBE_READONLY,
            YOUTUBE_UPLOAD
          ),
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
