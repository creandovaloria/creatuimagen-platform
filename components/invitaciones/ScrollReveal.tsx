"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal() {
  const init = useRef(false);
  useEffect(() => {
    if (init.current) return;
    init.current = true;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
