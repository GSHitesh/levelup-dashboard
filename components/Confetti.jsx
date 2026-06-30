"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = ["#6366f1", "#34d399", "#fbbf24", "#fb7185", "#38bdf8", "#a78bfa"];

function makePieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.25,
    duration: 1.6 + Math.random() * 1.2,
    rotate: Math.random() * 360,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 40,
  }));
}

/**
 * Full-screen confetti burst. Render conditionally; auto-clears after ~2.6s.
 */
export default function Confetti({ active, onDone, count = 90 }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return;
    setPieces(makePieces(count));
    const t = setTimeout(() => {
      setPieces([]);
      onDone?.();
    }, 2600);
    return () => clearTimeout(t);
  }, [active, count, onDone]);

  return (
    <AnimatePresence>
      {active && pieces.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: "-10vh", x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: "110vh",
                x: `${p.x + p.drift}vw`,
                rotate: p.rotate,
                opacity: [1, 1, 0.9, 0],
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              style={{
                position: "absolute",
                top: 0,
                width: p.size,
                height: p.size * 1.4,
                borderRadius: 2,
                background: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
