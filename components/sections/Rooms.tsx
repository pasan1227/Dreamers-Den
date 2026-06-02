"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useGsapReveal } from "@/lib/hooks/useGsapReveal";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { SECTION_IDS } from "@/lib/constants";
import type { Room } from "@/lib/types";

function RoomCard({ room, index }: { room: Room; index: number }) {
  const isReversed = index % 2 === 1;
  const colImage = isReversed ? "lg:col-start-7" : "lg:col-start-1";
  const colText = isReversed
    ? "lg:col-start-1 lg:row-start-1"
    : "lg:col-start-8";

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-center"
      data-reveal
    >
      <div className={`lg:col-span-6 ${colImage}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-midnight-deep)]">
          <Image
            src={room.image}
            alt={room.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
          />
          <span className="absolute top-5 left-5 eyebrow text-[var(--color-cream)] bg-[var(--color-midnight)]/65 backdrop-blur px-3 py-1.5 rounded-full">
            01 / 01
          </span>
        </div>
      </div>

      <div className={`lg:col-span-5 ${colText}`}>
        <p className="eyebrow text-[var(--color-amber)]/80 mb-4">
          {room.tagline}
        </p>
        <h3 className="display text-[clamp(2.25rem,4vw,3.5rem)] text-[var(--color-cream)] mb-5">
          {room.name}
        </h3>
        <p className="text-[1.02rem] leading-[1.78] text-[var(--color-cream)]/75 mb-7 max-w-[46ch]">
          {room.description}
        </p>
        <p className="font-[var(--font-mono)] text-[0.78rem] tracking-[0.18em] uppercase text-[var(--color-cream)]/65 mb-7 flex items-center gap-3">
          <Icon name="bed" size={16} /> {room.capacity}
        </p>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-9">
          {room.amenities.map((a) => (
            <li
              key={a.label}
              className="flex items-center gap-3 text-[0.92rem] text-[var(--color-cream)]/85"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-amber)]/30 text-[var(--color-amber)]">
                <Icon name={a.icon} size={14} />
              </span>
              {a.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-baseline gap-6 border-t border-[var(--color-cream)]/15 pt-6">
          <div>
            <p className="eyebrow text-[var(--color-amber)]/75">From</p>
            <p className="display text-[1.9rem] leading-none mt-1 text-[var(--color-cream)]">
              {site.pricePerNightUsd}{" "}
              <span className="text-[var(--color-cream)]/55 text-[1.1rem]">
                / {site.pricePerNightLkr}
              </span>
            </p>
            <p className="text-[0.78rem] text-[var(--color-cream)]/55 mt-1">
              per night · breakfast on request
            </p>
          </div>
          <Button
            as="a"
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="md"
            className="ml-auto"
          >
            Hold a night
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Rooms() {
  const ref = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={SECTION_IDS.rooms}
      className="relative py-28 lg:py-40 bg-[var(--color-midnight)] text-[var(--color-cream)]"
    >
      <Container className="flex flex-col gap-20 lg:gap-32">
        <SectionHeading
          index="02"
          eyebrow="Three rooms, one apex"
          title={
            <>
              One A-frame,{" "}
              <em className="not-italic font-light italic text-[var(--color-amber)]">
                rented as a whole.
              </em>
            </>
          }
          lede="Three bedrooms, one shared bathroom, a fully equipped kitchen, a balcony for the slow hours. Sleeps up to six adults."
          tone="dark"
        />

        <div className="flex flex-col gap-24 lg:gap-32">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
