"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormData } from "@/lib/validations/user";
import { registerUser } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiGoogleFill } from "react-icons/ri";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterFormData) {
    setError("");
    const res = await registerUser(data);
    if (!res.success) { setError(res.error || "Registration failed"); return; }
    await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <div className="space-y-4">
      <Button type="button" variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        <RiGoogleFill className="w-4 h-4" />
        Continue with Google
      </Button>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-sand-200" />
        <span className="font-sans text-xs text-charcoal-muted">or</span>
        <div className="flex-1 h-px bg-sand-200" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full name" {...register("name")} error={errors.name?.message} />
        <Input label="Email address" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Password" type="password" {...register("password")} error={errors.password?.message} hint="Minimum 8 characters" />
        {error && <p className="font-sans text-sm text-red-500">{error}</p>}
        <Button type="submit" loading={isSubmitting} className="w-full">Create account</Button>
      </form>
    </div>
  );
}
