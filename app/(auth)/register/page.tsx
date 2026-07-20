import { RegisterForm } from "@/components/forms/RegisterForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
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
            Create your account
          </h1>
          <p className="font-sans text-charcoal-muted text-sm">
            Join thousands of design-conscious homeowners
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-sand-200 p-8">
          <RegisterForm />
          <p className="font-sans text-center text-sm text-charcoal-muted mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
