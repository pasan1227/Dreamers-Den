import { Container } from "@/components/ui/Container";
import { AframeMark } from "@/components/ui/AframeMark";
import { FairyLights } from "@/components/ui/FairyLights";

export function Intermission() {
  return (
    <section
      aria-label="A note from the hills"
      className="relative bg-[var(--color-cream)] text-[var(--color-midnight)] py-32 lg:py-48 overflow-hidden"
    >
      {/* faint amber wash so the cream doesn't read clinical */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 30% 20%, rgba(232,161,75,0.10), transparent 60%), radial-gradient(60% 50% at 85% 90%, rgba(201,136,74,0.12), transparent 65%)",
        }}
      />

      <div
        className="absolute right-6 lg:right-16 top-10 lg:top-16 pointer-events-none opacity-80"
        aria-hidden
      >
        <FairyLights width={180} height={130} tone="amber" density={10} />
      </div>

      <Container className="relative grid grid-cols-12 gap-y-12 gap-x-8 items-start">
        <aside
          className="hidden lg:flex col-span-1 flex-col items-center gap-6 pt-4 text-[var(--color-midnight)]/65"
          aria-hidden
        >
          <AframeMark size={20} tone="midnight" />
          <span className="vertical-mark">Interlude · No. 01</span>
        </aside>

        <div className="col-span-12 lg:col-span-10 lg:col-start-2 flex flex-col gap-10">
          <p className="eyebrow text-[var(--color-amber-deep)]">
            <span className="rule mr-4" aria-hidden /> A pause in the page
          </p>

          <blockquote className="display text-[clamp(2.4rem,6.4vw,6rem)] leading-[0.98] tracking-[-0.025em] max-w-[20ch]">
            <span aria-hidden className="text-[var(--color-amber-deep)] mr-2">
              &ldquo;
            </span>
            The hills don&rsquo;t hurry, and after a night here
            <em className="not-italic italic font-light text-[var(--color-amber-deep)]">
              {" "}neither will you.
            </em>
            <span aria-hidden className="text-[var(--color-amber-deep)] ml-1">
              &rdquo;
            </span>
          </blockquote>

          <div className="flex flex-wrap items-end justify-between gap-8 border-t border-[var(--color-midnight)]/15 pt-8 max-w-[60ch]">
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-[var(--color-midnight)]/60">
                Notes from the host
              </span>
              <span className="font-[var(--font-display)] italic text-[1.1rem] text-[var(--color-midnight)]/85">
                — left by the kettle, mostly
              </span>
            </div>
            <span className="font-[var(--font-mono)] text-[0.72rem] tracking-[0.28em] uppercase text-[var(--color-midnight)]/55 tabular-nums">
              06° 56′ N · 80° 47′ E · 1,868 m
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
