"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote, RefreshCw, Dumbbell, Check, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { QUOTES, CURRENCY_SYMBOL } from "@/lib/data";
import BreathingCircle from "./BreathingCircle";
import MusicPlayer from "./MusicPlayer";

function QuoteCard() {
  const [idx, setIdx] = useState(new Date().getDate() % QUOTES.length);
  const next = () => setIdx((i) => (i + 1) % QUOTES.length);
  const q = QUOTES[idx];

  return (
    <div className="card relative overflow-hidden p-6">
      <Quote className="absolute -right-2 -top-2 h-20 w-20 text-white/5" />
      <p className="text-xs font-medium uppercase tracking-wide text-accent-glow">
        Daily motivation
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mt-3 text-lg font-medium leading-relaxed text-white">
            “{q.text}”
          </p>
          <p className="mt-2 text-sm text-slate-400">— {q.author}</p>
        </motion.div>
      </AnimatePresence>
      <button onClick={next} className="btn-ghost mt-4">
        <RefreshCw className="h-4 w-4" /> New quote
      </button>
    </div>
  );
}

function FitnessCheckin() {
  const { presets, fitness, logFitness, removeFitness, todayKey } = useApp();
  const todays = fitness.filter((f) => f.date.slice(0, 10) === todayKey);
  const earnedToday = todays.reduce((s, f) => s + f.points, 0);

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-white">
          <Dumbbell className="h-4 w-4 text-rose" /> Fitness check-in
        </h3>
        <span className="chip bg-mint/10 text-mint">
          +{CURRENCY_SYMBOL}
          {earnedToday} today
        </span>
      </div>

      <p className="mb-2 text-xs text-slate-400">Tap what you crushed today:</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => logFitness(p)}
            className="chip bg-white/5 text-slate-200 hover:bg-white/10"
          >
            <span>{p.emoji}</span> {p.label}
            <span className="text-mint">+{p.points}</span>
          </motion.button>
        ))}
      </div>

      <div className="border-t border-white/5 pt-3">
        <p className="mb-2 text-xs font-medium text-slate-500">
          Logged today ({todays.length})
        </p>
        {todays.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nothing logged yet — move your body! 🏃
          </p>
        ) : (
          <ul className="space-y-1.5">
            <AnimatePresence>
              {todays.map((f) => (
                <motion.li
                  key={f.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2 text-slate-200">
                    <Check className="h-3.5 w-3.5 text-mint" /> {f.emoji}{" "}
                    {f.label}
                  </span>
                  <button
                    onClick={() => removeFitness(f.id)}
                    className="text-slate-600 hover:text-rose"
                    aria-label="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ZenLounge() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold text-white">
          <Leaf className="h-5 w-5 text-mint" /> Zen & Motivation Lounge
        </h1>
        <p className="text-sm text-slate-400">
          Reset your mind between deep-work sprints.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <QuoteCard />
          <FitnessCheckin />
        </div>
        <div className="space-y-4">
          <BreathingCircle />
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}
