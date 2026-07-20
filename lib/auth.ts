import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./db";
import { User } from "./models/User";
import { MongooseAdapter } from "./auth-adapter";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongooseAdapter(),

  providers: [
    ...authConfig.providers!,
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        await connectDB();

        const user = await User.findOne({
          email: email.toLowerCase(),
        });

        if (!user?.password) return null;

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
});

// import NextAuth from "next-auth";
// import type { NextAuthConfig } from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import connectDB from "./db";
// import { User } from "./models/User";
// import { MongooseAdapter } from "./auth-adapter";

// export const authConfig: NextAuthConfig = {
//   adapter: MongooseAdapter(),
//   session: { strategy: "jwt" },
//   pages: { signIn: "/login", error: "/login" },
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const { email, password } = credentials as { email: string; password: string };
//         if (!email || !password) return null;
//         await connectDB();
//         const user = await User.findOne({ email: email.toLowerCase() });
//         if (!user?.password) return null;
//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) return null;
//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           image: user.image,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = (user as { role?: string }).role ?? "CUSTOMER";
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         (session.user as { role?: string }).role = token.role as string;
//       }
//       return session;
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
