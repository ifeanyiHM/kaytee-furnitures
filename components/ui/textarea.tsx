import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block font-sans text-sm font-medium text-charcoal">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded font-sans text-sm text-charcoal bg-white resize-none",
            "placeholder:text-charcoal-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent",
            error ? "border-red-400" : "border-sand-200 hover:border-brand-300",
            className
          )}
          {...props}
        />
        {error && <p className="font-sans text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
