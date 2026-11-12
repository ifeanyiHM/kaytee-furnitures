"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowRightLine, RiCheckLine, RiLoader4Line } from "react-icons/ri";

import { createInquiry } from "@/actions/inquiries";
import { inquirySchema, type InquiryFormData } from "@/lib/validations/inquiry";

const fieldClassName =
  "w-full min-w-0 border-b border-sand-300 bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal-muted/60 focus:border-brand-600";

const labelClassName =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-2 text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  async function onSubmit(data: InquiryFormData) {
    setSubmitError(null);

    try {
      const result = await createInquiry(data);

      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          result.error ?? "Something went wrong. Please try again.",
        );
      }
    } catch {
      setSubmitError(
        "We couldn't send your enquiry. Please try again in a moment.",
      );
    }
  }

  if (submitted) {
    return (
      <div
        className="flex min-h-[420px] flex-col items-center justify-center px-5 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="flex size-16 items-center justify-center rounded-full border border-brand-300 bg-sand-100 text-brand-700">
          <RiCheckLine size={28} />
        </div>

        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-600">
          Enquiry received
        </p>

        <h3 className="mt-3 font-hero text-2xl tracking-[-0.03em] text-charcoal sm:text-3xl">
          Thank you for reaching out.
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-charcoal-muted">
          Your message has been submitted successfully. We appreciate your
          interest in Kaytee Furnitures & Interior.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
        {/* Name */}
        <div className="min-w-0">
          <label htmlFor="contact-name" className={labelClassName}>
            Your name <span className="text-brand-600">*</span>
          </label>

          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
            className={fieldClassName}
          />

          <div id="contact-name-error">
            <FieldError message={errors.name?.message} />
          </div>
        </div>

        {/* Email */}
        <div className="min-w-0">
          <label htmlFor="contact-email" className={labelClassName}>
            Email address <span className="text-brand-600">*</span>
          </label>

          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
            className={fieldClassName}
          />

          <div id="contact-email-error">
            <FieldError message={errors.email?.message} />
          </div>
        </div>

        {/* Phone */}
        <div className="min-w-0">
          <label htmlFor="contact-phone" className={labelClassName}>
            Phone number{" "}
            <span className="font-normal normal-case tracking-normal text-charcoal-muted">
              (Optional)
            </span>
          </label>

          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
            className={fieldClassName}
          />

          <div id="contact-phone-error">
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        {/* Subject */}
        <div className="min-w-0">
          <label htmlFor="contact-subject" className={labelClassName}>
            Subject <span className="text-brand-600">*</span>
          </label>

          <input
            id="contact-subject"
            type="text"
            placeholder="What is your enquiry about?"
            aria-invalid={!!errors.subject}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            {...register("subject")}
            className={fieldClassName}
          />

          <div id="contact-subject-error">
            <FieldError message={errors.subject?.message} />
          </div>
        </div>

        {/* Message */}
        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="contact-message" className={labelClassName}>
            Your message <span className="text-brand-600">*</span>
          </label>

          <textarea
            id="contact-message"
            rows={5}
            placeholder="Tell us a little about what you have in mind..."
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            {...register("message")}
            className={`${fieldClassName} resize-y`}
          />

          <div id="contact-message-error">
            <FieldError message={errors.message?.message} />
          </div>
        </div>
      </div>

      {/* Submission error */}
      {submitError && (
        <div
          className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* Submit */}
      <div className="mt-9 flex flex-col gap-4 border-t border-sand-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-6 text-charcoal-muted">
          Share a few details with us and we'll take it from there.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-4 bg-brand-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              Sending
              <RiLoader4Line className="animate-spin" size={17} />
            </>
          ) : (
            <>
              Send your enquiry
              <RiArrowRightLine
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
