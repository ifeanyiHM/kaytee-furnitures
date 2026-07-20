"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, type LoginFormData } from "@/lib/validations/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiGoogleFill } from "react-icons/ri";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormData) {
    setError("");
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) setError("Invalid email or password");
    else router.push(callbackUrl);
  }

  return (
    <div className="space-y-4">
      <Button type="button" variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl })}>
        <RiGoogleFill className="w-4 h-4" />
        Continue with Google
      </Button>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-sand-200" />
        <span className="font-sans text-xs text-charcoal-muted">or</span>
        <div className="flex-1 h-px bg-sand-200" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email address" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
        {error && <p className="font-sans text-sm text-red-500 text-center">{error}</p>}
        <Button type="submit" loading={isSubmitting} className="w-full">Sign in</Button>
      </form>
    </div>
  );
}
