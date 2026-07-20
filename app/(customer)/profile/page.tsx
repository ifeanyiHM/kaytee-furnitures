import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { ProfileForm } from "@/components/forms/profile-form";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal mb-6">Profile</h1>
      <div className="max-w-lg bg-white border border-sand-200 rounded-xl p-6">
        <ProfileForm user={{ name: session?.user?.name || "", email: session?.user?.email || "", image: session?.user?.image }} />
      </div>
    </div>
  );
}
