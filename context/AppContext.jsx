"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  SEED_TASKS,
  DIFFICULTIES,
  FITNESS_PRESETS,
  STORE_ITEMS,
} from "@/lib/data";

const STORAGE_KEY = "levelup-dashboard-v1";

const AppContext = createContext(null);

const pointsFor = (difficulty) =>
  DIFFICULTIES.find((d) => d.id === difficulty)?.points ?? 0;

const todayKey = () => new Date().toISOString().slice(0, 10);

const initialState = {
  tasks: SEED_TASKS,
  redemptions: [], // { id, itemId, title, cost, date }
  fitness: [], // { id, presetId, label, points, date }
  streak: { count: 0, lastActive: null },
};

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };

    case "ADD_TASK":
      return { ...state, tasks: [action.task, ...state.tasks] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, ...action.patch } : t
        ),
      };

    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };

    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, status: action.status } : t
        ),
      };

    case "REDEEM":
      return { ...state, redemptions: [action.entry, ...state.redemptions] };

    case "LOG_FITNESS":
      return { ...state, fitness: [action.entry, ...state.fitness] };

    case "REMOVE_FITNESS":
      return {
        ...state,
        fitness: state.fitness.filter((f) => f.id !== action.id),
      };

    case "BUMP_STREAK": {
      const today = todayKey();
      if (state.streak.lastActive === today) return state;
      const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      const count =
        state.streak.lastActive === yesterday ? state.streak.count + 1 : 1;
      return { ...state, streak: { count, lastActive: today } };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
    } catch (e) {
      // Corrupt storage — start fresh.
      console.warn("Failed to load saved state", e);
    }
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save state", e);
    }
  }, [state, hydrated]);

  const wallet = useMemo(() => {
    const earnedTasks = state.tasks
      .filter((t) => t.status === "done")
      .reduce((sum, t) => sum + pointsFor(t.difficulty), 0);
    const earnedFitness = state.fitness.reduce((s, f) => s + f.points, 0);
    const earned = earnedTasks + earnedFitness;
    const spent = state.redemptions.reduce((s, r) => s + r.cost, 0);
    return { earned, spent, balance: earned - spent, earnedTasks, earnedFitness };
  }, [state.tasks, state.fitness, state.redemptions]);

  const actions = useMemo(
    () => ({
      addTask: ({ title, category, difficulty, type = "task" }) =>
        dispatch({
          type: "ADD_TASK",
          task: {
            id: uid(),
            title: title.trim(),
            category,
            difficulty,
            type,
            status: "todo",
            createdAt: Date.now(),
          },
        }),

      updateTask: (id, patch) => dispatch({ type: "UPDATE_TASK", id, patch }),

      deleteTask: (id) => dispatch({ type: "DELETE_TASK", id }),

      moveTask: (id, status) => {
        dispatch({ type: "MOVE_TASK", id, status });
        if (status === "done") dispatch({ type: "BUMP_STREAK" });
      },

      toggleComplete: (task) => {
        const next = task.status === "done" ? "todo" : "done";
        dispatch({ type: "MOVE_TASK", id: task.id, status: next });
        if (next === "done") dispatch({ type: "BUMP_STREAK" });
      },

      redeem: (item) => {
        if (wallet.balance < item.cost) return false;
        dispatch({
          type: "REDEEM",
          entry: {
            id: uid(),
            itemId: item.id,
            title: item.title,
            cost: item.cost,
            emoji: item.emoji,
            date: new Date().toISOString(),
          },
        });
        return true;
      },

      logFitness: (preset) =>
        dispatch({
          type: "LOG_FITNESS",
          entry: {
            id: uid(),
            presetId: preset.id,
            label: preset.label,
            emoji: preset.emoji,
            points: preset.points,
            date: new Date().toISOString(),
          },
        }),

      removeFitness: (id) => dispatch({ type: "REMOVE_FITNESS", id }),

      reset: () => dispatch({ type: "RESET" }),
    }),
    [wallet.balance]
  );

  const value = useMemo(
    () => ({
      ...state,
      wallet,
      hydrated,
      todayKey: todayKey(),
      catalog: STORE_ITEMS,
      presets: FITNESS_PRESETS,
      ...actions,
    }),
    [state, wallet, hydrated, actions]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
