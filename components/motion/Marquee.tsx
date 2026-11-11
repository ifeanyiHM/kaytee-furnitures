/** Slow, pausable ticker. Pure CSS; duplicates content for a seamless loop. */
export function Marquee({
  items,
  className = "",
  duration = 70,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className={className}>{t}</span>
          <span className="mx-8 xl3:mx-12 inline-block h-1 w-1 bg-brand-400" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden">
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
