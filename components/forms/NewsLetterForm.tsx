"use client";
import { useState } from "react";
import { RiArrowRightLine, RiCheckLine } from "react-icons/ri";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 h-11 text-brand-400 font-sans text-sm">
        <RiCheckLine className="w-4 h-4" />
        You&apos;re subscribed — thanks!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 h-11 bg-white/6 border border-white/10 hover:border-white/20 focus:border-brand-400 focus:outline-none rounded-lg px-4 font-sans text-sm text-white placeholder:text-white/25 transition-colors"
      />
      <button
        type="submit"
        className="h-11 px-5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-sans text-sm font-medium flex items-center gap-2 transition-colors shrink-0"
      >
        Subscribe
        <RiArrowRightLine className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
