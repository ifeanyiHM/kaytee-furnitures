import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "ghost-light" | "danger" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  asChild?: boolean;
}

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-800 focus-visible:ring-brand-400 shadow-sm",
  secondary: "bg-brand-50 text-brand-800 hover:bg-brand-100 focus-visible:ring-brand-400",
  outline: "border border-brand-600 text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-400",
  ghost: "text-charcoal hover:bg-sand-100 focus-visible:ring-charcoal",
  "ghost-light": "text-white border border-white/30 hover:bg-white/10 focus-visible:ring-white",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
  link: "text-brand-600 hover:text-brand-800 underline-offset-4 hover:underline p-0 h-auto",
};

const sizes = {
  sm: "h-8 px-4 text-sm gap-1.5 rounded",
  md: "h-10 px-5 text-sm gap-2 rounded",
  lg: "h-12 px-8 text-base gap-2.5 rounded",
  icon: "h-9 w-9 rounded",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-sans font-medium tracking-wide",
        "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant], sizes[size], className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";
