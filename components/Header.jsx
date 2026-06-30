"use client";

import { motion } from "framer-motion";
import { Wallet, Flame, Zap, RotateCcw } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CURRENCY_SYMBOL } from "@/lib/data";

function AnimatedNumber({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="tabular-nums"
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

export default function Header() {
  const { wallet, streak, reset } = useApp();

  const onReset = () => {
    if (
      window.confirm(
        "Reset all tasks, points, and history back to the starting state?"
      )
    ) {
      reset();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent shadow-glow">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white sm:text-base">
              LevelUp
            </p>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              Job Switch · Virtual Economy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {streak?.count > 0 && (
            <div className="chip hidden bg-gold/10 text-gold sm:inline-flex">
              <Flame className="h-3.5 w-3.5" />
              {streak.count}d streak
            </div>
          )}

          <motion.div
            layout
            className="flex items-center gap-2 rounded-2xl border border-mint/20 bg-mint/10 px-3 py-1.5 sm:px-4 sm:py-2"
          >
            <Wallet className="h-4 w-4 text-mint sm:h-5 sm:w-5" />
            <div className="leading-none">
              <p className="text-[10px] uppercase tracking-wide text-mint/70">
                Wallet
              </p>
              <p className="text-base font-bold text-mint sm:text-lg">
                {CURRENCY_SYMBOL}
                <AnimatedNumber value={wallet.balance} />
              </p>
            </div>
          </motion.div>

          <button
            onClick={onReset}
            title="Reset progress"
            className="btn-ghost h-9 w-9 !px-0"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
