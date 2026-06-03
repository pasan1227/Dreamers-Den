import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";

const COLUMNS: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Visit",
    links: [
      { label: "Story", href: "#about" },
      { label: "The Cabana", href: "#rooms" },
      { label: "Gallery", href: "#gallery" },
      { label: "Experiences", href: "#experiences" },
    ],
  },
  {
    heading: "Stay",
    links: [
      { label: "Find Us", href: "#location" },
      { label: "Book Your Stay", href: "#book" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-midnight-deep)] text-[var(--color-cream)]/80 border-t border-[var(--color-amber)]/15">
      <Container className="py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Logo size={140} tone="cream" />
            <p className="eyebrow text-[var(--color-amber)]/80">{site.established}</p>
            <p className="display text-[clamp(2.5rem,5vw,3.75rem)] text-[var(--color-cream)] leading-[0.95]">
              Dreamers{" "}
              <em className="not-italic font-light italic text-[var(--color-amber)]">
                Den.
              </em>
            </p>
            <p className="lede text-[1.1rem] text-[var(--color-cream)]/70 max-w-[34ch]">
              A modern A-frame in the misty hill country. Run by hand, with love.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="lg:col-span-2 flex flex-col gap-4">
              <p className="eyebrow text-[var(--color-amber)]/75">{col.heading}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[0.95rem] text-[var(--color-cream)]/85 hover:text-[var(--color-amber)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className="eyebrow text-[var(--color-amber)]/75">Reach us</p>
            <a href={`tel:${site.phone}`} className="hover:text-[var(--color-amber)] transition-colors">
              {site.phone}
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-amber)] transition-colors"
            >
              WhatsApp · {site.whatsapp}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-[var(--color-amber)] transition-colors"
            >
              {site.email}
            </a>
            <div className="flex items-center gap-4 mt-2">
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="eyebrow text-[var(--color-cream)]/70 hover:text-[var(--color-amber)] transition-colors"
              >
                Facebook ↗
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="eyebrow text-[var(--color-cream)]/70 hover:text-[var(--color-amber)] transition-colors"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-cream)]/12 flex flex-wrap items-center justify-between gap-4 text-[0.78rem] text-[var(--color-cream)]/55 font-[var(--font-mono)] tracking-[0.18em] uppercase">
          <span>© {year} Dreamers Den · All rights reserved</span>
          {/* <span>Made by hand in Nuwara Eliya</span> */}
        </div>
      </Container>
    </footer>
  );
}
