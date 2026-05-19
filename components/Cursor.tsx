"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hide on touch devices or narrow screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.innerWidth <= 768;
    if (isTouch || isNarrow) {
      setIsMobile(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = () => cursorRef.current?.classList.add("is-hovering");
    const onLeave = () => cursorRef.current?.classList.remove("is-hovering");

    const bindInteractables = () => {
      const interactables = document.querySelectorAll("a, button, [data-hover]");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return interactables;
    };

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

    let interactables = bindInteractables();

    // Re-bind after DOM mutations (e.g. dropdown opens)
    const observer = new MutationObserver(() => {
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      interactables = bindInteractables();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
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
