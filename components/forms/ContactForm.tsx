"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryFormData } from "@/lib/validations/inquiry";
import { createInquiry } from "@/actions/inquiries";
import { RiArrowRightLine, RiCheckLine } from "react-icons/ri";

function UnderlineInput({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-muted mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full border-0 border-b border-charcoal-muted/50 bg-transparent rounded-none px-0 py-2.5 font-sans text-sm text-charcoal placeholder:text-charcoal-muted/30 focus:outline-none focus:border-charcoal ring-charcoal transition-colors"
      />
      {error && (
        <p className="font-sans text-xs text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  );
}

function UnderlineTextarea({
  label,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-muted mb-2">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full border-0 border-b border-charcoal-muted/50 bg-transparent rounded-none px-0 py-2.5 font-sans text-sm text-charcoal placeholder:text-charcoal-muted/30 focus:outline-none focus:border-charcoal transition-colors resize-none"
      />
      {error && (
        <p className="font-sans text-xs text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({ resolver: zodResolver(inquirySchema) });

  async function onSubmit(data: InquiryFormData) {
    const result = await createInquiry(data);
    if (result.success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
          <RiCheckLine className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h3 className="font-display text-2xl text-charcoal mb-1.5">
            Message received.
          </h3>
          <p className="font-sans text-sm text-charcoal-muted leading-relaxed max-w-xs">
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <UnderlineInput
          label="Your name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Adaeze Okonkwo"
        />
        <UnderlineInput
          label="Email address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="you@email.com"
        />
      </div>
      <UnderlineInput
        label="Phone (optional)"
        type="tel"
        {...register("phone")}
        placeholder="+234 801 234 5678"
      />
      <UnderlineInput
        label="Subject"
        {...register("subject")}
        error={errors.subject?.message}
        placeholder="What is this about?"
      />
      <UnderlineTextarea
        label="Your message"
        {...register("message")}
        rows={4}
        error={errors.message?.message}
        placeholder="Tell us how we can help…"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex items-center gap-3 font-sans text-sm font-medium text-charcoal hover:text-brand-600 transition-colors disabled:opacity-50 pt-1"
      >
        <span className="w-10 h-10 rounded-full border border-charcoal group-hover:border-brand-600 group-hover:bg-brand-600 flex items-center justify-center transition-all">
          {isSubmitting ? (
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <RiArrowRightLine className="w-4 h-4 group-hover:text-white transition-colors" />
          )}
        </span>
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
