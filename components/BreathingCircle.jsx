"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

// Box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s.
const PHASES = [
  { label: "Breathe in", scale: 1, duration: 4 },
  { label: "Hold", scale: 1, duration: 4 },
  { label: "Breathe out", scale: 0.55, duration: 4 },
  { label: "Hold", scale: 0.55, duration: 4 },
];

export default function BreathingCircle() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, PHASES[phase].duration * 1000);
    return () => clearTimeout(timer.current);
  }, [running, phase]);

  const toggle = () => {
    if (running) {
      setRunning(false);
      setPhase(0);
    } else {
      setPhase(0);
      setRunning(true);
    }
  };

  const current = PHASES[phase];

  return (
    <div className="card flex flex-col items-center p-6">
      <h3 className="mb-1 font-semibold text-white">Box Breathing</h3>
      <p className="mb-6 text-xs text-slate-400">4 in · 4 hold · 4 out · 4 hold</p>

      <div className="relative grid h-56 w-56 place-items-center">
        <div className="absolute h-full w-full rounded-full bg-accent/5" />
        <motion.div
          animate={
            running
              ? { scale: current.scale }
              : { scale: [1, 1.05, 1] }
          }
          transition={
            running
              ? { duration: current.duration, ease: "easeInOut" }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="grid h-44 w-44 place-items-center rounded-full bg-gradient-to-br from-accent to-mint shadow-glow"
        >
          <div className="grid h-32 w-32 place-items-center rounded-full bg-base-900/80 text-center">
            <span className="px-2 text-sm font-medium text-white">
              {running ? current.label : "Ready?"}
            </span>
          </div>
        </motion.div>
      </div>

      <button onClick={toggle} className="btn-primary mt-6">
        {running ? (
          <>
            <Pause className="h-4 w-4" /> Stop
          </>
        ) : (
          <>
            <Play className="h-4 w-4" /> Start session
          </>
        )}
      </button>
    </div>
  );
}
