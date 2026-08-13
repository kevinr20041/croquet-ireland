"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, MapPin } from "lucide-react";
import { MAIN_NAV } from "@/lib/nav";
import { TextSizeToggle } from "./TextSizeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur print:hidden">
      <div className="border-b border-line-soft bg-paper-tint">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-sm">
          <p className="text-ink-soft">Governing body for croquet in Ireland</p>
          <div className="hidden items-center gap-4 sm:flex">
            <TextSizeToggle />
            <Link href="/contact" className="font-semibold text-lawn-deep hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/brand/cai-logo.png"
            alt="Croquet Association of Ireland"
            className="h-12 w-12 shrink-0 object-contain"
          />
          <span>
            <span className="block font-serif text-lg font-semibold leading-tight text-ink">
              Croquet Association
            </span>
            <span className="block text-sm leading-tight text-ink-soft">of Ireland</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/play/clubs"
            className="flex items-center gap-1.5 rounded-full border border-lawn px-4 py-2 text-sm font-semibold text-lawn-deep hover:bg-paper-tint"
          >
            <MapPin size={16} /> Find a Club
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-soft hover:bg-paper-tint hover:text-ink"
          >
            <Search size={16} /> Search
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          Menu
        </button>
      </div>

      <nav className="hidden border-t border-line-soft lg:block" aria-label="Primary">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-1 px-4">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-3 text-[0.95rem] font-semibold text-ink-soft hover:text-lawn-deep"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-line-soft bg-paper lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            <li>
              <Link
                href="/play/clubs"
                className="block rounded-lg px-3 py-3 text-base font-semibold text-lawn-deep"
                onClick={() => setOpen(false)}
              >
                Find a Club
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="block rounded-lg px-3 py-3 text-base font-semibold text-ink-soft"
                onClick={() => setOpen(false)}
              >
                Search
              </Link>
            </li>
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-line-soft pt-2">
              <TextSizeToggle />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
