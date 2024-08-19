import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { joinScopes } from "../../../../lib/utils";
import {
  USER_EMAIL,
  USER_PROFILE,
  YOUTUBE_READONLY,
  YOUTUBE_UPLOAD,
} from "../../../../lib/constants";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.OAUTH_WEB_CLIENT_ID!,
        client_secret: process.env.OAUTH_WEB_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const tokens = await response.json();

    if (!response.ok) throw new Error("Error refreshing access token");

    return {
      ...token,
      accessToken: tokens.access_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

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
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_at! * 1000;
      }

      if (Date.now() > (token.expiresAt as number) - 2 * 60 * 1000) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
