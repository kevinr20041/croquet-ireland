"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-maroon hover:bg-paper-raised"
    >
      Sign out
    </button>
  );
}
