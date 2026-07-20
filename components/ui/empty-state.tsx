import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && <div className="mb-4 text-charcoal-muted">{icon}</div>}
      <h3 className="font-display text-xl text-charcoal mb-2">{title}</h3>
      {description && <p className="font-sans text-sm text-charcoal-muted max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}
