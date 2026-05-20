"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, summary, [role='button'], [role='link'], [data-hover]";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.innerWidth <= 768;
    if (isTouch || isNarrow) {
      setIsMobile(true);
      return;
    }

    const setHovering = (on: boolean) => {
      const c = cursorRef.current;
      if (!c) return;
      if (on) c.classList.add("is-hovering");
      else c.classList.remove("is-hovering");
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      // Event delegation — checks the actual element under the pointer on every move,
      // so it works for every interactive element across the whole site without binding.
      const target = e.target as Element | null;
      const interactive = !!target?.closest?.(INTERACTIVE_SELECTOR);
      setHovering(interactive);
    };

    const onLeaveWindow = () => setHovering(false);

    const animate = () => {
      const ease = 0.18;
      current.current.x += (pos.current.x - current.current.x) * ease;
      current.current.y += (pos.current.y - current.current.y) * ease;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${current.current.x}px`;
        cursorRef.current.style.top = `${current.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    />
  );
}
