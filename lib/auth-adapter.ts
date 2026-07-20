import type { Adapter, AdapterUser, AdapterAccount, VerificationToken as AdapterVerificationToken } from "next-auth/adapters";
import connectDB from "./db";
import { User } from "./models/User";
import { Account } from "./models/Account";
import { Session } from "./models/Session";
import { VerificationToken } from "./models/VerificationToken";

function toAdapterUser(user: { _id: { toString(): string }; email: string; emailVerified?: Date | null; name?: string | null; image?: string | null }): AdapterUser {
  return {
    id: user._id.toString(),
    email: user.email,
    emailVerified: user.emailVerified ?? null,
    name: user.name ?? null,
    image: user.image ?? null,
  };
}

export function MongooseAdapter(): Adapter {
  return {
    async createUser(data: AdapterUser) {
      await connectDB();
      const userData: Record<string, unknown> = {
        email: data.email,
        emailVerified: data.emailVerified,
        image: data.image ?? undefined,
      };
      if (data.name) userData.name = data.name;
      const user = await User.create(userData);
      return toAdapterUser(user);
    },
    async getUser(id: string) {
      await connectDB();
      const user = await User.findById(id);
      if (!user) return null;
      return toAdapterUser(user);
    },
    async getUserByEmail(email: string) {
      await connectDB();
      const user = await User.findOne({ email });
      if (!user) return null;
      return toAdapterUser(user);
    },
    async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      await connectDB();
      const account = await Account.findOne({ provider, providerAccountId });
      if (!account) return null;
      const user = await User.findById(account.userId);
      if (!user) return null;
      return toAdapterUser(user);
    },
    async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
      await connectDB();
      const update: Record<string, unknown> = {};
      if (data.name !== undefined) update.name = data.name;
      if (data.email !== undefined) update.email = data.email;
      if (data.emailVerified !== undefined) update.emailVerified = data.emailVerified;
      if (data.image !== undefined) update.image = data.image;
      const user = await User.findByIdAndUpdate(data.id, update, { new: true });
      return toAdapterUser(user!);
    },
    async deleteUser(id: string) {
      await connectDB();
      await User.findByIdAndDelete(id);
    },
    async linkAccount(data: AdapterAccount) {
      await connectDB();
      await Account.create({ ...data, userId: data.userId });
      return data;
    },
    async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      await connectDB();
      await Account.findOneAndDelete({ provider, providerAccountId });
    },
    async createSession(data: { sessionToken: string; userId: string; expires: Date }) {
      await connectDB();
      const session = await Session.create(data);
      return { sessionToken: session.sessionToken, userId: session.userId.toString(), expires: session.expires };
    },
    async getSessionAndUser(sessionToken: string) {
      await connectDB();
      const session = await Session.findOne({ sessionToken });
      if (!session) return null;
      const user = await User.findById(session.userId);
      if (!user) return null;
      return {
        session: { sessionToken: session.sessionToken, userId: session.userId.toString(), expires: session.expires },
        user: toAdapterUser(user),
      };
    },
    async updateSession(data: { sessionToken: string; expires?: Date; userId?: string }) {
      await connectDB();
      const session = await Session.findOneAndUpdate({ sessionToken: data.sessionToken }, data, { new: true });
      if (!session) return null;
      return { sessionToken: session.sessionToken, userId: session.userId.toString(), expires: session.expires };
    },
    async deleteSession(sessionToken: string) {
      await connectDB();
      await Session.findOneAndDelete({ sessionToken });
    },
    async createVerificationToken(data: AdapterVerificationToken) {
      await connectDB();
      await VerificationToken.create(data);
      return data;
    },
    async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
      await connectDB();
      const vt = await VerificationToken.findOneAndDelete({ identifier, token });
      if (!vt) return null;
      return { identifier: vt.identifier, token: vt.token, expires: vt.expires };
    },
  };
}
