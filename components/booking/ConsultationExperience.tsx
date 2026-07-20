"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormData } from "@/lib/validations/booking";
import { createBooking } from "@/actions/bookings";
import { BUDGET_RANGES, SPACE_SIZES } from "@/lib/utils/constants";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiCalendarLine,
  RiUser3Line,
  RiBuilding2Line,
} from "react-icons/ri";
import type { ServiceType } from "@/types";

/* ─── Underline field primitive ─────────────────────────── */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-muted mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-sans text-xs text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  );
}

function UnderlineInput({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <input
        {...props}
        className="w-full border-0 border-b border-charcoal-muted/50 bg-transparent rounded-none px-0 py-2.5 font-sans text-sm text-charcoal placeholder:text-charcoal-muted/40 focus:outline-none focus:border-charcoal-muted/50 transition-colors"
      />
    </Field>
  );
}

function UnderlineSelect({
  label,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <select
        {...props}
        className="w-full appearance-none border-0 border-b border-charcoal-muted/50 bg-transparent rounded-none px-0 py-2.5 pr-5 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal-muted/50 transition-colors cursor-pointer"
      >
        {children}
      </select>
    </Field>
  );
}

/* ─── Service picker cards ───────────────────────────────── */
function ServicePicker({
  services,
  values,
  onChange,
  error,
}: {
  services: ServiceType[];
  values: string[];
  onChange: (ids: string[]) => void;
  error?: string;
}) {
  const fallback = [
    {
      _id: "id",
      name: "Interior Design",
      slug: "interior-design",
      description: "",
      features: [],
      active: true,
      order: 1,
    },
    {
      _id: "sp",
      name: "Space Planning",
      slug: "space-planning",
      description: "",
      features: [],
      active: true,
      order: 2,
    },
    {
      _id: "fp",
      name: "Furniture Procurement",
      slug: "furniture-procurement",
      description: "",
      features: [],
      active: true,
      order: 3,
    },
    {
      _id: "vc",
      name: "Virtual Consultation",
      slug: "virtual-consultation",
      description: "",
      features: [],
      active: true,
      order: 4,
    },
    {
      _id: "rm",
      name: "Renovation Management",
      slug: "renovation-management",
      description: "",
      features: [],
      active: true,
      order: 5,
    },
    {
      _id: "ld",
      name: "Lighting Design",
      slug: "lighting-design",
      description: "",
      features: [],
      active: true,
      order: 6,
    },
  ] as ServiceType[];

  const list = services.length > 0 ? services : fallback;

  function toggle(id: string) {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal-muted">
          What can we help with?
        </p>
        <p className="font-sans text-[10px] text-charcoal-muted/50">
          Select all that apply
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {list.map((s) => {
          const selected = values.includes(s._id);
          return (
            <button
              key={s._id}
              type="button"
              onClick={() => toggle(s._id)}
              className={`relative text-left px-4 py-3.5 rounded-lg border transition-all duration-150 ${
                selected
                  ? "border-charcoal-muted/80 bg-brand-50 text-charcoal"
                  : "border-charcoal-muted/50 bg-white text-charcoal-muted hover:border-charcoal-muted/60 hover:text-charcoal"
              }`}
            >
              {/* Check mark */}
              <span
                className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-150 ${
                  selected
                    ? "bg-charcoal-light/80 border-charcoal-light/90"
                    : "border-charcoal-muted/50"
                }`}
              >
                {selected && <RiCheckLine className="w-2.5 h-2.5 text-white" />}
              </span>
              <p className="font-sans text-sm leading-snug pr-5">{s.name}</p>
            </button>
          );
        })}
      </div>
      {values.length > 0 && (
        <p className="font-sans text-[11px] text-charcoal-light/70 mt-2.5">
          {values.length} service{values.length > 1 ? "s" : ""} selected
        </p>
      )}
      {error && <p className="font-sans text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}

/* ─── Success state ──────────────────────────────────────── */
function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mb-7">
        <RiCheckLine className="w-7 h-7 text-brand-600" />
      </div>
      <h3 className="font-display text-3xl text-charcoal mb-3">
        Request received.
      </h3>
      <p className="font-sans text-charcoal-muted text-sm leading-relaxed max-w-xs">
        We&apos;ll review your project details and a design lead will call you
        within 24 hours.
      </p>
      <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
        {[
          { icon: RiCalendarLine, label: "Call within 24 hours" },
          { icon: RiUser3Line, label: "Dedicated design lead assigned" },
          {
            icon: RiBuilding2Line,
            label: "Site visit or virtual — your choice",
          },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-brand-600" />
            </div>
            <span className="font-sans text-sm text-charcoal-muted">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main form ──────────────────────────────────────────── */
const STEPS = [
  { id: 1, icon: RiUser3Line, label: "You" },
  { id: 2, icon: RiBuilding2Line, label: "Project" },
  { id: 3, icon: RiCalendarLine, label: "Detail" },
];

export function ConsultationExperience({
  services,
}: {
  services: ServiceType[];
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  async function next() {
    let fields: (keyof BookingFormData)[] = [];
    if (step === 1) fields = ["firstName", "lastName", "email", "phone"];
    if (step === 2) {
      if (serviceIds.length === 0) {
        // manually show error by triggering
        fields = ["serviceId"];
      }
    }
    const ok = await trigger(fields);
    if (ok) setStep((s) => s + 1);
  }

  async function onSubmit(data: BookingFormData) {
    const result = await createBooking(data);
    if (result.success) setSubmitted(true);
  }

  if (submitted) return <SuccessState />;

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h2 className="font-display text-3xl text-charcoal mb-1.5">
          Book your free consultation
        </h2>
        <p className="font-sans text-sm text-charcoal-muted">
          Takes about 2 minutes · No commitment required
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => {
          const done = step > s.id;
          const current = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    done
                      ? "bg-charcoal-light/90 border-charcoal-light/90"
                      : current
                        ? "bg-white border border-charcoal-light/90"
                        : "bg-white border border-charcoal-light/30"
                  }`}
                >
                  {done ? (
                    <RiCheckLine className="w-4 h-4 text-white" />
                  ) : (
                    <s.icon
                      className={`w-3.5 h-3.5 ${current ? "text-charcoal-light/90" : "text-charcoal-light/30"}`}
                    />
                  )}
                </div>
                <span
                  className={`font-sans text-[10px] uppercase tracking-wider ${current ? "text-charcoal" : "text-charcoal-muted/50"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 mb-4 transition-colors duration-300 ${step > s.id ? "bg-charcoal-light/70" : "bg-charcoal-light/30"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 — Personal details */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-2 gap-5">
              <UnderlineInput
                label="First name"
                {...register("firstName")}
                error={errors.firstName?.message}
                placeholder="Adaeze"
              />
              <UnderlineInput
                label="Last name"
                {...register("lastName")}
                error={errors.lastName?.message}
                placeholder="Okonkwo"
              />
            </div>
            <UnderlineInput
              label="Email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="you@email.com"
            />
            <UnderlineInput
              label="Phone number"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
              placeholder="+234 801 234 5678"
            />
          </div>
        )}

        {/* Step 2 — Service selection */}
        {step === 2 && (
          <div className="animate-fade-up">
            <ServicePicker
              services={services}
              values={serviceIds}
              onChange={(ids) => {
                setServiceIds(ids);
                // Store first selected ID in form (schema expects string); full list in description
                setValue("serviceId", ids[0] || "");
              }}
              error={errors.serviceId?.message}
            />
          </div>
        )}

        {/* Step 3 — Project details */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-2 gap-5">
              <UnderlineSelect label="Budget range" {...register("budget")}>
                <option value="">Select range</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </UnderlineSelect>
              <UnderlineSelect label="Space size" {...register("spaceSize")}>
                <option value="">Select size</option>
                {SPACE_SIZES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </UnderlineSelect>
            </div>
            <UnderlineInput
              label="Preferred date (optional)"
              type="date"
              {...register("preferredDate")}
            />
            <Field
              label="Tell us about your project"
              error={errors.description?.message}
            >
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe your space, style preferences, and what you'd like to achieve…"
                className="w-full border-0 border-b border-charcoal-muted/50 bg-transparent rounded-none px-0 py-2.5 font-sans text-sm text-charcoal placeholder:text-charcoal-muted/40 focus:outline-none focus:border-charcoal-muted/50 transition-colors resize-none"
              />
            </Field>
          </div>
        )}

        {/* Navigation */}
        <div
          className={`flex mt-10 gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-2 font-sans text-sm text-charcoal-muted hover:text-charcoal transition-colors"
            >
              <RiArrowLeftLine className="w-4 h-4" />
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center gap-2 bg-charcoal hover:bg-brand-800 text-white font-sans text-sm font-medium px-7 py-3 rounded-xl transition-all"
            >
              Continue
              <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-2 bg-charcoal hover:bg-brand-800 text-white font-sans text-sm font-medium px-8 py-3 rounded-xl transition-all disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Submit request"}
              <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Step counter */}
        <p className="font-sans text-[10px] text-charcoal-muted/40 text-center mt-6 tracking-wider">
          Step {step} of {STEPS.length}
        </p>
      </form>
    </div>
  );
}
