import { LoginForm } from "@/components/forms/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center">
              <span className="text-white font-display font-semibold text-sm">
                L
              </span>
            </div>
            <span className="font-display text-xl font-semibold text-charcoal">
              Luxe Interiors
            </span>
          </Link>
          <h1 className="font-display text-3xl text-charcoal mb-2">
            Welcome back
          </h1>
          <p className="font-sans text-charcoal-muted text-sm">
            Sign in to your account to continue
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-sand-200 p-8">
          <Suspense
            fallback={
              <div className="h-40 animate-pulse bg-sand-100 rounded" />
            }
          >
            <LoginForm />
          </Suspense>
          <p className="font-sans text-center text-sm text-charcoal-muted mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
