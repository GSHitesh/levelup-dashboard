"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import TasksZone from "@/components/TasksZone";
import Store from "@/components/Store";
import ZenLounge from "@/components/ZenLounge";

export default function Home() {
  const [tab, setTab] = useState("dashboard");
  const { hydrated } = useApp();

  const render = () => {
    switch (tab) {
      case "tasks":
        return <TasksZone />;
      case "store":
        return <Store />;
      case "zen":
        return <ZenLounge />;
      default:
        return <Dashboard onNavigate={setTab} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navigation active={tab} onChange={setTab} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-24 pt-2 sm:px-6 sm:pb-10">
        {!hydrated ? (
          <div className="grid h-64 place-items-center text-slate-500">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-8 w-8 rounded-full border-2 border-white/10 border-t-accent"
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {render()}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <footer className="hidden border-t border-white/5 py-4 text-center text-xs text-slate-600 sm:block">
        Built with Next.js · Tailwind · Framer Motion — earn smart, spend smarter.
      </footer>
    </div>
  );
}
