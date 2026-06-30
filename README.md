# 🎮 LevelUp — Gamified Learning & Productivity Dashboard

A fully responsive Single Page Application that helps you **proactively prepare for an SDE/DevOps job switch** while **curbing impulse spending** on quick commerce and food delivery — through a virtual economy.

Complete prep tasks → earn virtual cash → redeem it for *real* treats in the **Guilt-Free Store**.

![Tech](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0080?logo=framer)

### 🌐 Live demo
**https://gshitesh.github.io/levelup-dashboard/**

> Auto-deployed to GitHub Pages on every push to `main` via GitHub Actions.

## ✨ Features

### 1. Gamification & Virtual Economy
- Task-based rewards by difficulty: **Easy = 10**, **Medium = 30**, **Hard = 50** pts.
- Points convert to **Virtual Rupees** shown in a **sticky wallet header**.
- **Guilt-Free Store** — spend virtual cash to unlock real rewards (Swiggy/Instamart order, coffee, weekend off…) with **confetti + pop-up animations**.

### 2. Tasks Zone (Job-Switch Focus)
- **Kanban board** (To Do / In Progress / Done).
- Pre-loaded tracks: **DSA, System Design, DevOps Tools, Hands-on Projects, Resume & Profile**.
- Add custom **tasks, learning modules, and interview questions**.
- Framer Motion **hover effects** + satisfying **checkmark animation** on completion.

### 3. Zen & Motivation Lounge
- **Daily quotes** widget.
- **Box-breathing circle** (4s in · 4s hold · 4s out · 4s hold) built with Framer Motion.
- **Fitness check-in** (8k steps, gym, HIIT, yoga…) that also earns points.
- Minimal **Lofi music player** with embedded relaxing streams.

### 4. Technical
- **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, **Lucide React**.
- Dark-mode-first, clean developer-tool aesthetic.
- State via **React Context + localStorage** — points & tasks **persist on refresh**.
- Fully responsive: phones, iPads, MacBooks, laptops.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & preview the static export
```bash
npm run build      # outputs a static site to ./out
npx serve out      # preview the production build locally
```

## 🚀 Deployment (GitHub Pages)

This repo ships with a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that builds the static export and publishes it to GitHub Pages on every push to `main`.

To enable it once:
1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or re-run the workflow) — the site goes live at the URL above.

> The app is exported as a fully static site (`output: "export"`), so it needs no server. `basePath` is set to `/levelup-dashboard` to match the repo name.

## 🗂️ Project Structure

```
app/
  layout.jsx        # Root layout + fonts + provider
  page.jsx          # SPA shell with tab transitions
  globals.css       # Tailwind + design tokens
components/
  Header.jsx        # Sticky wallet header
  Navigation.jsx    # Animated tab bar
  Dashboard.jsx     # Overview & progress
  TasksZone.jsx     # Kanban board + add modal
  Store.jsx         # Guilt-Free Store + confetti
  ZenLounge.jsx     # Quotes / breathing / fitness / music
  BreathingCircle.jsx
  MusicPlayer.jsx
  Confetti.jsx
context/
  AppContext.jsx    # Global state + persistence
lib/
  data.js           # Seed tasks, store catalog, quotes
```

## 🧠 How the economy works
1. Move a task to **Done** → its points are added to your wallet.
2. Log fitness activities → bonus points.
3. Visit the **Store** → spend the balance on a real-life reward, guilt-free.

---

Built to make grinding for the next role feel rewarding. Earn smart, spend smarter. 💪
