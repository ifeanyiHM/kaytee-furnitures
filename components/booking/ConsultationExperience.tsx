"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBuilding2Line,
  RiCalendarLine,
  RiCheckLine,
  RiLoader4Line,
  RiSparkling2Line,
  RiUser3Line,
} from "react-icons/ri";

import { bookingSchema, type BookingFormData } from "@/lib/validations/booking";

import { createBooking } from "@/actions/bookings";
import { BUDGET_RANGES, SPACE_SIZES } from "@/lib/utils/constants";

const INPUT_CLASS =
  "w-full min-w-0 border-b border-sand-300 bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors duration-300 placeholder:text-charcoal-muted/50 focus:border-brand-600";

const LABEL_CLASS =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700";

const STEPS = [
  {
    id: 1,
    icon: RiUser3Line,
    label: "About you",
    heading: "Let's get to know you.",
    description:
      "First, tell us how to reach you so we can follow up about your project.",
  },
  {
    id: 2,
    icon: RiBuilding2Line,
    label: "Your space",
    heading: "What are we designing?",
    description: "Help us understand the space you're looking to transform.",
  },
  {
    id: 3,
    icon: RiCalendarLine,
    label: "Project brief",
    heading: "Tell us more about your vision.",
    description:
      "Share your preferences, expectations and any details that will help us understand your project.",
  },
];

function Field({
  label,
  error,
  id,
  children,
}: {
  label: string;
  error?: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="group min-w-0">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-xs leading-5 text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  id: string;
};

function UnderlineInput({ label, error, id, ...props }: InputProps) {
  return (
    <Field label={label} error={error} id={id}>
      <input
        id={id}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={INPUT_CLASS}
      />
    </Field>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  id: string;
  children: ReactNode;
};

function UnderlineSelect({
  label,
  error,
  id,
  children,
  ...props
}: SelectProps) {
  return (
    <Field label={label} error={error} id={id}>
      <div className="relative">
        <select
          id={id}
          {...props}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_CLASS} cursor-pointer appearance-none pr-8`}
        >
          {children}
        </select>

        <RiArrowDownSLine
          size={18}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-600"
        />
      </div>
    </Field>
  );
}

function SuccessState() {
  const nextSteps = [
    {
      icon: RiCalendarLine,
      title: "Your brief is reviewed",
      description: "Our team considers your project details.",
    },
    {
      icon: RiUser3Line,
      title: "We get in touch",
      description: "We'll contact you using the details you provided.",
    },
    {
      icon: RiBuilding2Line,
      title: "We discuss the next steps",
      description: "We'll talk through the right direction for your project.",
    },
  ];

  return (
    <div
      className="flex min-h-[520px] flex-col items-center justify-center py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex size-16 items-center justify-center rounded-full border border-brand-300 bg-sand-100 text-brand-700">
        <RiCheckLine size={28} />
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-600">
        Project brief submitted
      </p>

      <h2 className="mt-3 max-w-md font-hero text-3xl leading-tight tracking-[-0.04em] text-charcoal sm:text-4xl">
        Your brief is now{" "}
        <span className="font-light italic text-brand-600">with us.</span>
      </h2>

      <p className="mt-4 max-w-sm text-sm leading-7 text-charcoal-muted">
        Thank you for telling us about your project. Our team will review the
        details and get in touch using the contact information you provided.
      </p>

      <div className="mt-10 w-full max-w-md border-t border-sand-200 text-left">
        {nextSteps.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4 border-b border-sand-200 py-5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sand-200 bg-sand-50 text-brand-600">
                <Icon size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-charcoal">
                  {item.title}
                </p>

                <p className="mt-1 text-xs leading-6 text-charcoal-muted">
                  {item.description}
                </p>
              </div>

              <span className="pt-1 text-[10px] tracking-wider text-brand-500">
                0{index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConsultationExperience() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: "1",
    },
  });

  const currentStep = STEPS[step - 1];
  const progress = (step / STEPS.length) * 100;

  async function next() {
    const fields: (keyof BookingFormData)[] =
      step === 1
        ? ["firstName", "lastName", "email", "phone"]
        : ["projectType", "spaceSize"];

    const valid = await trigger(fields);

    if (valid && step < STEPS.length) {
      setStep((current) => current + 1);
      setSubmitError(null);
    }
  }

  function previous() {
    if (step > 1) {
      setStep((current) => current - 1);
      setSubmitError(null);
    }
  }

  async function onSubmit(data: BookingFormData) {
    setSubmitError(null);

    try {
      const result = await createBooking(data);

      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(
          result.error ?? "Something went wrong. Please try again.",
        );
      }
    } catch {
      setSubmitError(
        "We couldn't submit your brief. Please try again in a moment.",
      );
    }
  }

  if (submitted) {
    return <SuccessState />;
  }

  return (
    <div className="w-full min-w-0">
      {/* Form heading */}
      <div className="mb-9">
        <div className="mb-4 flex items-center gap-2 text-brand-600">
          <RiSparkling2Line size={15} />

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            Project enquiry
          </p>
        </div>

        <h2 className="font-hero text-2xl leading-tight tracking-[-0.04em] text-charcoal sm:text-3xl lg:text-4xl">
          {currentStep.heading}
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-7 text-charcoal-muted">
          {currentStep.description}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-10 border-y border-sand-200 py-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            Your progress
          </span>

          <span className="text-xs tabular-nums text-charcoal-muted">
            Step 0{step} <span className="mx-1 text-sand-400">/</span> 03
          </span>
        </div>

        <div
          className="mb-6 h-1 w-full overflow-hidden bg-sand-100"
          role="progressbar"
          aria-label="Consultation form progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step}
        >
          <div
            className="h-full bg-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {STEPS.map((item) => {
            const Icon = item.icon;
            const done = step > item.id;
            const active = step === item.id;

            return (
              <div
                key={item.id}
                className="flex min-w-0 items-center gap-2"
                aria-current={active ? "step" : undefined}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    done
                      ? "border-brand-900 bg-brand-900 text-white"
                      : active
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-sand-300 bg-sand-50 text-charcoal-muted"
                  }`}
                >
                  {done ? <RiCheckLine size={15} /> : <Icon size={15} />}
                </div>

                <span
                  className={`hidden truncate text-[10px] font-semibold sm:block ${
                    active ? "text-brand-800" : "text-charcoal-muted"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form fields */}
      <form
        onSubmit={
          step < 3
            ? (event) => {
                event.preventDefault();
                void next();
              }
            : handleSubmit(onSubmit)
        }
        noValidate
      >
        {/* Step 1: Personal details */}
        {step === 1 && (
          <div className="space-y-7">
            <div className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2">
              <UnderlineInput
                id="booking-first-name"
                label="First name *"
                {...register("firstName")}
                error={errors.firstName?.message}
                placeholder="Adaeze"
                autoComplete="given-name"
              />

              <UnderlineInput
                id="booking-last-name"
                label="Last name *"
                {...register("lastName")}
                error={errors.lastName?.message}
                placeholder="Okonkwo"
                autoComplete="family-name"
              />
            </div>

            <UnderlineInput
              id="booking-email"
              label="Email address *"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <UnderlineInput
              id="booking-phone"
              label="Phone number *"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
              placeholder="+234 801 234 5678"
              autoComplete="tel"
            />
          </div>
        )}

        {/* Step 2: Space details */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="border-l-2 border-brand-400 pl-4">
              <p className="text-sm leading-7 text-charcoal-muted">
                Choose the space that best describes your project. This helps us
                understand the scale and nature of the work you're considering.
              </p>
            </div>

            <UnderlineSelect
              id="booking-project-type"
              label="Type of space *"
              {...register("projectType")}
              error={errors.projectType?.message}
            >
              <option value="">Choose a space</option>

              {[
                "Living room",
                "Bedroom",
                "Kitchen",
                "Dining space",
                "Full residence",
                "Other interior space",
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </UnderlineSelect>

            <UnderlineSelect
              id="booking-space-size"
              label="Property size *"
              {...register("spaceSize")}
              error={errors.spaceSize?.message}
            >
              <option value="">Select an approximate size</option>

              {SPACE_SIZES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </UnderlineSelect>

            <UnderlineInput
              id="booking-project-location"
              label="Project location"
              {...register("projectLocation")}
              placeholder="e.g. Lekki, Lagos"
              autoComplete="address-level2"
            />
          </div>
        )}

        {/* Step 3: Project brief */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="border-l-2 border-brand-400 pl-4">
              <p className="text-sm leading-7 text-charcoal-muted">
                These details help us understand your expectations and the
                direction you'd like your project to take.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2">
              <UnderlineSelect
                id="booking-budget"
                label="Approximate budget"
                {...register("budget")}
              >
                <option value="">Prefer not to say</option>

                {BUDGET_RANGES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </UnderlineSelect>

              <UnderlineSelect
                id="booking-timeline"
                label="Preferred timeline"
                {...register("timeline")}
              >
                <option value="">Not decided</option>

                {[
                  "As soon as possible",
                  "Within 1–3 months",
                  "Within 3–6 months",
                  "More than 6 months",
                  "Just exploring",
                ].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </UnderlineSelect>
            </div>

            <UnderlineInput
              id="booking-preferred-date"
              label="Preferred date to speak (optional)"
              type="date"
              {...register("preferredDate")}
            />

            <Field
              id="booking-description"
              label="Tell us about your project *"
              error={errors.description?.message}
            >
              <textarea
                id="booking-description"
                {...register("description")}
                rows={5}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? "booking-description-error" : undefined
                }
                placeholder="Describe the space, what you would like to change, and any ideas or references you already have..."
                className={`${INPUT_CLASS} resize-y`}
              />
            </Field>
          </div>
        )}

        {/* Submission error */}
        {submitError && (
          <p
            role="alert"
            className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-xs leading-6 text-red-700"
          >
            {submitError}
          </p>
        )}

        {/* Form navigation */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-sand-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={previous}
              className="inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal-muted transition-colors hover:text-brand-700 sm:justify-start"
            >
              <RiArrowLeftLine size={16} />
              Previous step
            </button>
          ) : (
            <span className="hidden text-xs text-charcoal-muted sm:block">
              Your information is used for this project enquiry.
            </span>
          )}

          {step < 3 ? (
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-4 bg-brand-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-brand-700 sm:w-auto"
            >
              Continue
              <RiArrowRightLine
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-4 bg-brand-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Submitting brief..." : "Submit project brief"}

              {isSubmitting ? (
                <RiLoader4Line className="animate-spin" size={17} />
              ) : (
                <RiArrowRightLine
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
