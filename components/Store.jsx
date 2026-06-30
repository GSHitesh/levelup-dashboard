"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, Check, ShoppingBag, PartyPopper, History } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CURRENCY_SYMBOL } from "@/lib/data";
import Confetti from "./Confetti";

function RewardToast({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.7, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="card w-full max-w-sm p-7 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8 }}
              className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-mint/15 text-4xl"
            >
              {item.emoji}
            </motion.div>
            <h3 className="text-lg font-bold text-white">Reward unlocked! 🎉</h3>
            <p className="mt-1 text-sm text-slate-400">
              Enjoy your <span className="text-mint">{item.title}</span> — you
              earned it the smart way.
            </p>
            <button onClick={onClose} className="btn-primary mt-5 w-full">
              <PartyPopper className="h-4 w-4" /> Awesome
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Store() {
  const { catalog, wallet, redeem, redemptions } = useApp();
  const [confetti, setConfetti] = useState(false);
  const [toast, setToast] = useState(null);

  const handleRedeem = (item) => {
    const ok = redeem(item);
    if (ok) {
      setConfetti(true);
      setToast(item);
    }
  };

  return (
    <div className="space-y-6">
      <Confetti active={confetti} onDone={() => setConfetti(false)} />
      <RewardToast item={toast} onClose={() => setToast(null)} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-white">
            <ShoppingBag className="h-5 w-5 text-accent-glow" /> Guilt-Free Store
          </h1>
          <p className="text-sm text-slate-400">
            Spend virtual cash on real treats — earned, not impulsive.
          </p>
        </div>
        <div className="chip bg-mint/10 text-mint">
          {CURRENCY_SYMBOL}
          {wallet.balance.toLocaleString()} available
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((item) => {
          const affordable = wallet.balance >= item.cost;
          const progress = Math.min(100, (wallet.balance / item.cost) * 100);
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="card flex flex-col p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-2xl">
                  {item.emoji}
                </span>
                <span className="chip bg-accent/10 text-accent-glow">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-400">{item.desc}</p>

              {!affordable && (
                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {Math.round(progress)}% there ·{" "}
                    {CURRENCY_SYMBOL}
                    {(item.cost - wallet.balance).toLocaleString()} to go
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gold">
                  {CURRENCY_SYMBOL}
                  {item.cost.toLocaleString()}
                </span>
                <button
                  disabled={!affordable}
                  onClick={() => handleRedeem(item)}
                  className={
                    affordable
                      ? "btn-primary"
                      : "btn cursor-not-allowed bg-white/5 text-slate-500"
                  }
                >
                  {affordable ? (
                    <>
                      <Check className="h-4 w-4" /> Redeem
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" /> Locked
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* History */}
      <div className="card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <History className="h-4 w-4 text-slate-400" /> Redemption history
        </h2>
        {redemptions.length === 0 ? (
          <p className="text-sm text-slate-500">
            No redemptions yet — your future self thanks you. 🧠
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {redemptions.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-slate-300">
                  {r.emoji} {r.title}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {new Date(r.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-rose">
                    -{CURRENCY_SYMBOL}
                    {r.cost}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
