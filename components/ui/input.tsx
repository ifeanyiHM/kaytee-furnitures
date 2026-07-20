import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block font-sans text-sm font-medium text-charcoal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-10 px-3 border rounded font-sans text-sm text-charcoal bg-white",
            "placeholder:text-charcoal-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent",
            error ? "border-red-400 focus:ring-red-400" : "border-sand-200 hover:border-brand-300",
            className
          )}
          {...props}
        />
        {error && <p className="font-sans text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="font-sans text-xs text-charcoal-muted">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
