"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  Coins,
  Target,
  Flame,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, CURRENCY_SYMBOL, QUOTES } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <motion.div variants={item} className="card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}

export default function Dashboard({ onNavigate }) {
  const { tasks, wallet, streak, redemptions } = useApp();

  const done = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;
  const completion = total ? Math.round((done / total) * 100) : 0;
  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  const perCategory = CATEGORIES.map((c) => {
    const list = tasks.filter((t) => t.category === c.id);
    const d = list.filter((t) => t.status === "done").length;
    return { ...c, total: list.length, done: d, pct: list.length ? (d / list.length) * 100 : 0 };
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Hero */}
      <motion.div
        variants={item}
        className="card relative overflow-hidden p-6 sm:p-8"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <span className="chip bg-accent/15 text-accent-glow">
            <Sparkles className="h-3.5 w-3.5" /> Your mission
          </span>
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Earn your way to the next role.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Complete SDE/DevOps prep tasks to bank virtual cash, then redeem it for
            real treats — instead of impulse-spending on quick commerce.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => onNavigate("tasks")} className="btn-primary">
              <Target className="h-4 w-4" /> Go to tasks
            </button>
            <button onClick={() => onNavigate("store")} className="btn-ghost">
              <Coins className="h-4 w-4" /> Visit store
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={Coins}
          label="Wallet balance"
          value={`${CURRENCY_SYMBOL}${wallet.balance.toLocaleString()}`}
          accent="#34d399"
        />
        <StatCard
          icon={TrendingUp}
          label="Total earned"
          value={`${CURRENCY_SYMBOL}${wallet.earned.toLocaleString()}`}
          accent="#818cf8"
        />
        <StatCard
          icon={CheckCircle2}
          label="Tasks done"
          value={`${done}/${total}`}
          accent="#fbbf24"
        />
        <StatCard
          icon={Flame}
          label="Day streak"
          value={`${streak?.count ?? 0}`}
          accent="#fb7185"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Overall progress */}
        <motion.div variants={item} className="card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Prep progress by track</h2>
            <span className="text-sm font-semibold text-mint">{completion}%</span>
          </div>
          <div className="space-y-4">
            {perCategory.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-300">
                    {c.emoji} {c.label}
                  </span>
                  <span className="text-slate-500">
                    {c.done}/{c.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote + recent redemptions */}
        <motion.div variants={item} className="space-y-4">
          <div className="card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Quote of the day
            </p>
            <p className="mt-2 text-sm italic text-slate-200">“{quote.text}”</p>
            <p className="mt-2 text-xs text-slate-500">— {quote.author}</p>
          </div>

          <div className="card p-5">
            <p className="mb-3 text-sm font-semibold text-white">Recent rewards</p>
            {redemptions.length === 0 ? (
              <p className="text-sm text-slate-500">
                No rewards redeemed yet. Keep grinding! 💪
              </p>
            ) : (
              <ul className="space-y-2">
                {redemptions.slice(0, 4).map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-slate-300">
                      {r.emoji} {r.title}
                    </span>
                    <span className="text-rose">
                      -{CURRENCY_SYMBOL}
                      {r.cost}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
