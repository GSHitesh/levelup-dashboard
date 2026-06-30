"use client";

import { motion } from "framer-motion";
import { Music, Play, Pause, Radio } from "lucide-react";
import { useState } from "react";

// Curated lofi/relaxing YouTube live streams (used as placeholder audio source).
const STATIONS = [
  { id: "jfKfPfyJRdk", name: "Lofi Girl · beats to relax/study" },
  { id: "4xDzrJKXOOY", name: "Synthwave radio · chill" },
  { id: "S_MOd40zlYU", name: "Dark ambient · deep focus" },
];

function Equalizer({ active }) {
  return (
    <div className="flex h-5 items-end gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-mint"
          animate={
            active
              ? { height: [4, 18, 8, 16, 5] }
              : { height: 4 }
          }
          transition={
            active
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.12 }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [station, setStation] = useState(0);

  const select = (i) => {
    setStation(i);
    setPlaying(true);
  };

  return (
    <div className="card overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-white">
          <Music className="h-4 w-4 text-accent-glow" /> Lofi Lounge
        </h3>
        <Equalizer active={playing} />
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-xl bg-base-900/60 p-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/15">
          <Radio className="h-5 w-5 text-accent-glow" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {STATIONS[station].name}
          </p>
          <p className="text-xs text-slate-500">
            {playing ? "Now playing…" : "Paused"}
          </p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white shadow-glow transition hover:bg-accent-glow"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>

      <div className="space-y-1.5">
        {STATIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => select(i)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
              station === i
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5"
            }`}
          >
            <span className="text-xs">{station === i ? "▶" : "•"}</span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Hidden audio source — only mounted when playing to respect autoplay rules. */}
      {playing && (
        <div className="mt-4 overflow-hidden rounded-xl">
          <iframe
            title="Lofi stream"
            width="100%"
            height="80"
            src={`https://www.youtube.com/embed/${STATIONS[station].id}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
