"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
  HelpCircle,
  ClipboardList,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  CATEGORIES,
  COLUMNS,
  DIFFICULTIES,
  CURRENCY_SYMBOL,
} from "@/lib/data";

const TYPE_ICONS = {
  task: ClipboardList,
  module: BookOpen,
  question: HelpCircle,
};

const catOf = (id) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
const diffOf = (id) => DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[0];

function TaskCard({ task }) {
  const { moveTask, deleteTask, toggleComplete } = useApp();
  const cat = catOf(task.category);
  const diff = diffOf(task.difficulty);
  const colIdx = COLUMNS.findIndex((c) => c.id === task.status);
  const TypeIcon = TYPE_ICONS[task.type] ?? ClipboardList;
  const isDone = task.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="card group p-3.5"
      style={{ borderLeft: `3px solid ${cat.color}` }}
    >
      <div className="flex items-start gap-2.5">
        <button
          onClick={() => toggleComplete(task)}
          aria-label={isDone ? "Mark as not done" : "Mark complete"}
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
            isDone
              ? "border-mint bg-mint text-base-900"
              : "border-white/20 text-transparent hover:border-mint"
          }`}
        >
          <AnimatePresence>
            {isDone && (
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`text-sm leading-snug ${
              isDone ? "text-slate-500 line-through" : "text-slate-100"
            }`}
          >
            {task.title}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span
              className="chip"
              style={{ backgroundColor: `${cat.color}1a`, color: cat.color }}
            >
              {cat.emoji} {cat.label}
            </span>
            <span
              className="chip"
              style={{ backgroundColor: `${diff.color}1a`, color: diff.color }}
            >
              {CURRENCY_SYMBOL}
              {diff.points} · {diff.label}
            </span>
            {task.type !== "task" && (
              <span className="chip bg-white/5 text-slate-400">
                <TypeIcon className="h-3 w-3" />
                {task.type}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
          className="rounded-lg p-1 text-slate-600 opacity-0 transition hover:bg-rose/10 hover:text-rose group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
        <button
          disabled={colIdx === 0}
          onClick={() => moveTask(task.id, COLUMNS[colIdx - 1].id)}
          className="rounded-lg p-1 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:opacity-20"
          aria-label="Move left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-[10px] uppercase tracking-wide text-slate-600">
          {COLUMNS[colIdx].label}
        </span>
        <button
          disabled={colIdx === COLUMNS.length - 1}
          onClick={() => moveTask(task.id, COLUMNS[colIdx + 1].id)}
          className="rounded-lg p-1 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:opacity-20"
          aria-label="Move right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function AddTaskModal({ open, onClose }) {
  const { addTask } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [difficulty, setDifficulty] = useState("medium");
  const [type, setType] = useState("task");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, category, difficulty, type });
    setTitle("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-end bg-black/60 p-0 backdrop-blur-sm sm:place-items-center sm:p-4"
        >
          <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="card w-full max-w-md rounded-b-none rounded-t-3xl p-5 sm:rounded-3xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Add to your prep board</h3>
              <button type="button" onClick={onClose} className="btn-ghost h-8 w-8 !px-0">
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mb-1 block text-xs text-slate-400">Title</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve LeetCode #146 (LRU Cache)"
              className="input mb-4"
            />

            <label className="mb-1 block text-xs text-slate-400">Type</label>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { id: "task", label: "Task" },
                { id: "module", label: "Module" },
                { id: "question", label: "Interview Q" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`btn ${
                    type === t.id ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <label className="mb-1 block text-xs text-slate-400">Category</label>
            <div className="mb-4 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className="chip transition"
                  style={{
                    backgroundColor:
                      category === c.id ? c.color : `${c.color}1a`,
                    color: category === c.id ? "#0a0a0f" : c.color,
                  }}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>

            <label className="mb-1 block text-xs text-slate-400">Difficulty</label>
            <div className="mb-5 grid grid-cols-3 gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id)}
                  className="rounded-xl border px-2 py-2 text-sm font-medium transition"
                  style={{
                    borderColor: difficulty === d.id ? d.color : "transparent",
                    backgroundColor:
                      difficulty === d.id ? `${d.color}22` : "rgba(255,255,255,0.04)",
                    color: difficulty === d.id ? d.color : "#94a3b8",
                  }}
                >
                  {d.label}
                  <span className="block text-[10px] opacity-70">
                    +{d.points}
                  </span>
                </button>
              ))}
            </div>

            <button type="submit" className="btn-primary w-full">
              <Plus className="h-4 w-4" /> Add to board
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function TasksZone() {
  const { tasks } = useApp();
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);

  const visible = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((t) => t.category === filter)),
    [tasks, filter]
  );

  const byColumn = (col) => visible.filter((t) => t.status === col);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Tasks Zone</h1>
          <p className="text-sm text-slate-400">
            Your SDE/DevOps job-switch board. Earn cash for every win.
          </p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary self-start">
          <Plus className="h-4 w-4" /> Add task
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`chip ${
            filter === "all" ? "bg-accent text-white" : "bg-white/5 text-slate-400"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className="chip transition"
            style={{
              backgroundColor: filter === c.id ? c.color : `${c.color}1a`,
              color: filter === c.id ? "#0a0a0f" : c.color,
            }}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Kanban */}
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const list = byColumn(col.id);
          return (
            <div key={col.id} className="rounded-2xl bg-base-800/40 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-white">{col.label}</h2>
                <span className="chip bg-white/5 text-slate-400">
                  {list.length}
                </span>
              </div>
              <motion.div layout className="flex flex-col gap-3">
                <AnimatePresence mode="popLayout">
                  {list.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </AnimatePresence>
                {list.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/10 px-3 py-6 text-center text-xs text-slate-600">
                    Nothing here yet
                  </p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      <AddTaskModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
