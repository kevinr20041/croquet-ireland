import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-maroon">
      <span className="inline-block h-1 w-6 rounded-full bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-ink-soft">{description}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[0.95rem] font-semibold transition-colors";
  const styles = {
    primary: "bg-lawn text-paper-raised hover:bg-lawn-deep",
    secondary: "border-2 border-lawn text-lawn-deep hover:bg-paper-tint",
    ghost: "border border-line text-ink-soft hover:bg-paper-tint hover:text-ink",
  } as const;
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-gradient-to-br from-lawn-light/20 via-paper-tint to-sky/10">
      <Container className="py-10 sm:py-14">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-lg text-ink-soft">{description}</p>}
      </Container>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-4 text-[1.05rem] leading-relaxed text-ink-soft [&_strong]:text-ink [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
      {children}
    </div>
  );
}

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-xl border border-line bg-paper-raised shadow-sm ${className}`}>{children}</div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-lawn/25 bg-lawn/10 px-2.5 py-0.5 text-xs font-semibold text-lawn-deep">
      {children}
    </span>
  );
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
}

export function formatDateRange(start: string, end?: string | null) {
  if (!end || end === start) return formatDate(start);
  const s = new Date(start);
  const e = new Date(end);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString("en-IE", { month: "long", year: "numeric" })}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}
