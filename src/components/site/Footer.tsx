import Link from "next/link";
import { MAIN_NAV } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-paper-tint">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg font-semibold text-ink">Croquet Association of Ireland</p>
          <p className="mt-2 text-sm text-ink-soft">
            CAI is the governing body for the sport of croquet in Ireland. Croquet was first played here in the
            1830s and remains popular today, particularly in its &ldquo;garden&rdquo; form.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft hover:text-lawn-deep hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <span className="block text-ink-faint">Secretary</span>
              <a href="mailto:secretary@croquetireland.com" className="text-lawn-deep hover:underline">
                secretary@croquetireland.com
              </a>
            </li>
            <li>
              <span className="block text-ink-faint">Web Master</span>
              <a href="mailto:webcai@croquetireland.com" className="text-lawn-deep hover:underline">
                webcai@croquetireland.com
              </a>
            </li>
            <li>
              <span className="block text-ink-faint">Photo Info</span>
              <a href="mailto:photocai@croquetireland.com" className="text-lawn-deep hover:underline">
                photocai@croquetireland.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Follow CAI</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://www.facebook.com"
                className="text-ink-soft hover:text-lawn-deep hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                className="text-ink-soft hover:text-lawn-deep hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.sportireland.ie"
                className="text-ink-soft hover:text-lawn-deep hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sport Ireland
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs text-ink-faint">
          <p>&copy; {new Date().getFullYear()} Croquet Association of Ireland.</p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="max-w-xs">We confirm compliance with the Governance Code for the Community, Voluntary and Charity sector.</p>
            <a href="https://www.sportireland.ie" target="_blank" rel="noopener noreferrer" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/brand/sport-ireland-logo.png"
                alt="Sport Ireland"
                className="h-9 w-auto object-contain"
              />
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/brand/governance-code-logo.jpg"
              alt="The Governance Code: A Journey to Success"
              className="h-9 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
