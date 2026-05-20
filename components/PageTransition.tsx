"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Phase = "idle" | "covering" | "revealing";
type Variant = "fade" | "slide";

const COVER_MS = 900;
const REVEAL_MS = 900;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [variant, setVariant] = useState<Variant>("slide");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const target = link.getAttribute("target");
      if (target && target !== "_self") return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (!href.startsWith("/") || href.startsWith("//")) return;

      // Escape hatch for any link that wants the default behavior
      if (link.hasAttribute("data-no-transition")) return;

      // Same-page link — let it through
      const pathOnly = href.split("#")[0].split("?")[0];
      if (pathOnly === pathname) return;

      // Stop Next.js Link from also handling this click.
      e.preventDefault();
      e.stopPropagation();

      // Going to/from "/" → white cross-fade; otherwise slide up
      const isHomeMove = pathOnly === "/" || pathname === "/";
      setVariant(isHomeMove ? "fade" : "slide");

      clearTimers();
      setPhase("covering");

      timers.current.push(
        setTimeout(() => {
          router.push(href);
          setPhase("revealing");
          timers.current.push(
            setTimeout(() => setPhase("idle"), REVEAL_MS)
          );
        }, COVER_MS)
      );
    };

    // Capture phase so we run before Next.js Link's own onClick handler,
    // which otherwise calls preventDefault and starts navigating immediately.
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      clearTimers();
    };
  }, [pathname, router]);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden
      className={`page-transition page-transition--${variant} page-transition--${phase}`}
    />
  );
}
