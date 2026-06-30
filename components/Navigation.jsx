"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, ListTodo, ShoppingBag, Leaf } from "lucide-react";

export const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "store", label: "Store", icon: ShoppingBag },
  { id: "zen", label: "Zen Lounge", icon: Leaf },
];

export default function Navigation({ active, onChange }) {
  return (
    <nav className="sticky bottom-0 z-40 border-t border-white/5 bg-base-900/90 backdrop-blur-xl sm:static sm:border-t-0 sm:bg-transparent sm:backdrop-blur-none">
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-2 py-2 sm:gap-2 sm:px-6 sm:py-4">
        <div className="flex w-full items-center justify-around gap-1 rounded-2xl bg-base-800/60 p-1 sm:w-auto sm:justify-start">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors sm:flex-none sm:flex-row sm:gap-2 sm:text-sm ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-accent shadow-glow"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative z-10 h-5 w-5" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
