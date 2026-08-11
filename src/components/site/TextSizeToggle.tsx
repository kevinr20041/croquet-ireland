"use client";

import { useEffect, useState } from "react";

export function TextSizeToggle() {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("cai-text-size");
    if (stored === "large") {
      setLarge(true);
      document.documentElement.setAttribute("data-text-size", "large");
    }
  }, []);

  function toggle() {
    const next = !large;
    setLarge(next);
    if (next) {
      document.documentElement.setAttribute("data-text-size", "large");
      window.localStorage.setItem("cai-text-size", "large");
    } else {
      document.documentElement.removeAttribute("data-text-size");
      window.localStorage.setItem("cai-text-size", "normal");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={large}
      className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-paper-tint hover:text-ink"
    >
      {large ? "A− Normal text" : "A+ Larger text"}
    </button>
  );
}
