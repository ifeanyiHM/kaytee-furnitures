import { RevealLines } from "@/components/motion/Reveal";
import Image from "next/image";

/** Shared opener for inner pages: full-bleed image, oversized serif title. */
export function PageHero({
  eyebrow,
  lines,
  intro,
  image,
  alt = "",
}: {
  eyebrow: string;
  lines: string[];
  intro?: string;
  image: string;
  alt?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] xl3:min-h-[72svh] items-end overflow-hidden bg-charcoal">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/30 to-charcoal/50" />
      <div className="site-container relative pb-14 pt-40 lg:pb-20 xl3:pb-24">
        <p className="site-kicker mb-6 flex items-center gap-4 text-brand-300">
          <span className="h-px w-10 bg-brand-400" />
          {eyebrow}
        </p>
        <RevealLines
          as="h1"
          immediate
          lines={lines}
          className="display-page text-white max-w-[16ch] xl3:max-w-[18ch]"
        />
        {intro && (
          <p className="mt-8 max-w-xl xl3:max-w-2xl font-sans text-[15px] xl3:text-lg leading-relaxed text-white/65">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
