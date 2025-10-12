import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const hashedPassword = bcrypt.hashSync("password123", 10);

const fallbackSecret = crypto.randomBytes(32).toString("hex");
const authSecret = process.env.NEXTAUTH_SECRET ?? fallbackSecret;

if (!process.env.NEXTAUTH_SECRET) {
  // eslint-disable-next-line no-console
  console.warn("NEXTAUTH_SECRET is not set. Using a temporary dev secret. Set NEXTAUTH_SECRET in .env.local to avoid session issues.");
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "admin", password: hashedPassword };

        if (!credentials?.username || !credentials.password) return null;

        const isUsernameValid = credentials.username === user.name;
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (isUsernameValid && isPasswordValid) {
          return { id: user.id, name: user.name };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After successful sign-in without an explicit callbackUrl, go to /dashboard
      if (url === baseUrl) {
        return `${baseUrl}/dashboard`;
      }
      // Allow relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow same-origin absolute URLs
      try {
        const target = new URL(url);
        if (target.origin === baseUrl) {
          return url;
        }
      } catch {
        // Fall through to default
      }
      // Fallback to baseUrl
      return baseUrl;
    },
  },
  session: { strategy: "jwt" },
  secret: authSecret,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
