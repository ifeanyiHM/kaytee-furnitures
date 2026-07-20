"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/actions/user";

export function ProfileForm({ user }: { user: { name: string; email: string; image?: string | null } }) {
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await updateProfile({ name });
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center">
          <span className="font-display text-xl text-brand-600">{user.name?.[0] || "U"}</span>
        </div>
        <div>
          <p className="font-display text-lg text-charcoal">{user.name}</p>
          <p className="font-sans text-sm text-charcoal-muted">{user.email}</p>
        </div>
      </div>
      <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email address" value={user.email} disabled hint="Email cannot be changed" />
      {saved && <p className="font-sans text-sm text-green-600">Profile updated!</p>}
      <Button type="submit" loading={loading}>Save changes</Button>
    </form>
  );
}
