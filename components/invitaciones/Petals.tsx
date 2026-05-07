"use client";
import { useEffect, useRef } from "react";

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 90}%`,
  size: 10 + (i % 5) * 4,
  duration: 5 + (i % 6) * 1.2,
  delay: (i * 0.7) % 8,
  opacity: 0.4 + (i % 4) * 0.15,
}));

export default function Petals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(() => {}, {});
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden
    >
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="petal-fall absolute"
          style={{
            left: p.left,
            top: `-${p.size}px`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#d4718a" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="12" rx="6" ry="10" transform="rotate(-30 12 12)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
