import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { ADMIN_NAV } from "@/lib/adminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-paper-tint md:block">
        <div className="border-b border-line px-5 py-5">
          <p className="text-sm font-bold uppercase tracking-wide text-maroon">CAI Admin</p>
          <p className="mt-0.5 text-sm text-ink-soft">{session.displayName}</p>
        </div>
        <nav className="px-3 py-4" aria-label="Admin">
          <ul className="space-y-1">
            {ADMIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-paper-raised hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line px-3 py-4">
          <Link href="/" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-paper-raised">
            ← View live site
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-6 flex items-center justify-between gap-3 md:hidden">
          <p className="font-serif text-lg font-semibold text-ink">CAI Admin</p>
          <LogoutButton />
        </div>
        {children}
      </div>
    </div>
  );
}
