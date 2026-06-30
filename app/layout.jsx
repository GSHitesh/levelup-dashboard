import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "LevelUp · Gamified Learning & Productivity Dashboard",
  description:
    "Prepare for an SDE/DevOps job switch while curbing impulse spending through a virtual economy.",
};

export const viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
