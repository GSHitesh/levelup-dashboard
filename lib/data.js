// Static seed data, point rules, store catalog, and motivational content.

export const POINTS = {
  easy: 10,
  medium: 30,
  hard: 50,
};

// 1 virtual point === 1 virtual rupee/dollar in the wallet.
export const CURRENCY_SYMBOL = "₹";

export const CATEGORIES = [
  { id: "dsa", label: "DSA", color: "#818cf8", emoji: "🧠" },
  { id: "system-design", label: "System Design", color: "#34d399", emoji: "🏗️" },
  { id: "devops", label: "DevOps Tools", color: "#fbbf24", emoji: "⚙️" },
  { id: "projects", label: "Hands-on Projects", color: "#fb7185", emoji: "🚀" },
  { id: "resume", label: "Resume & Profile", color: "#38bdf8", emoji: "📄" },
];

export const COLUMNS = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export const DIFFICULTIES = [
  { id: "easy", label: "Easy", points: POINTS.easy, color: "#34d399" },
  { id: "medium", label: "Medium", points: POINTS.medium, color: "#fbbf24" },
  { id: "hard", label: "Hard", points: POINTS.hard, color: "#fb7185" },
];

let _id = 0;
const seed = (t) => ({ id: `seed-${_id++}`, status: "todo", ...t });

export const SEED_TASKS = [
  // DSA
  seed({ title: "Solve 5 array & hashing problems", category: "dsa", difficulty: "medium" }),
  seed({ title: "Master sliding window pattern", category: "dsa", difficulty: "hard" }),
  seed({ title: "Revise Big-O cheat sheet", category: "dsa", difficulty: "easy" }),
  // System Design
  seed({ title: "Design a URL shortener (TinyURL)", category: "system-design", difficulty: "hard" }),
  seed({ title: "Read about CAP theorem & consistency", category: "system-design", difficulty: "medium" }),
  // DevOps
  seed({ title: "Write a multi-stage Dockerfile", category: "devops", difficulty: "medium" }),
  seed({ title: "Build a Jenkins declarative pipeline (Groovy)", category: "devops", difficulty: "hard" }),
  seed({ title: "Automate setup with an Ansible playbook", category: "devops", difficulty: "medium" }),
  seed({ title: "Practice 10 essential Bash one-liners", category: "devops", difficulty: "easy" }),
  seed({ title: "Set up Prometheus + Grafana monitoring", category: "devops", difficulty: "hard" }),
  // Projects
  seed({ title: "Ship a CI/CD demo repo with GitHub Actions", category: "projects", difficulty: "hard" }),
  // Resume
  seed({ title: "Quantify impact bullets on resume", category: "resume", difficulty: "easy" }),
  seed({ title: "Optimize LinkedIn headline & banner", category: "resume", difficulty: "easy" }),
];

export const STORE_ITEMS = [
  {
    id: "instamart",
    title: "Instamart / Blinkit Order",
    desc: "Unlock one guilt-free quick-commerce order.",
    cost: 500,
    emoji: "🛒",
    tag: "Quick Commerce",
  },
  {
    id: "swiggy",
    title: "Swiggy / Zomato Treat",
    desc: "A well-earned food delivery on you.",
    cost: 600,
    emoji: "🍔",
    tag: "Food",
  },
  {
    id: "coffee",
    title: "Cafe Coffee Run",
    desc: "Grab that fancy latte without the guilt.",
    cost: 200,
    emoji: "☕",
    tag: "Treat",
  },
  {
    id: "movie",
    title: "Movie Night",
    desc: "Stream or theatre — your pick.",
    cost: 400,
    emoji: "🎬",
    tag: "Leisure",
  },
  {
    id: "weekend",
    title: "Weekend Day-Off",
    desc: "A full no-study recharge day.",
    cost: 1000,
    emoji: "🏝️",
    tag: "Recharge",
  },
  {
    id: "gadget",
    title: "Gadget Fund Deposit",
    desc: "Add ₹1000 to your real gadget savings.",
    cost: 1500,
    emoji: "🎧",
    tag: "Big Reward",
  },
];

export const QUOTES = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Slow is smooth, and smooth is fast.", author: "Navy SEALs" },
];

export const FITNESS_PRESETS = [
  { id: "steps", label: "8k Steps", emoji: "🚶", points: 10 },
  { id: "gym", label: "1.5h Gym", emoji: "🏋️", points: 20 },
  { id: "hiit", label: "HIIT Workout", emoji: "🔥", points: 15 },
  { id: "yoga", label: "Yoga / Stretch", emoji: "🧘", points: 10 },
  { id: "water", label: "3L Water", emoji: "💧", points: 5 },
];
