"use client";
import { motion } from "framer-motion";
import MenuIcon from "./icons/MenuIcon";
import VirusIcon from "./icons/VirusIcon";
import MusicIcon from "./icons/MusicIcon";

export default function AppBar({ onMenu, onMusic }: { onMenu?: () => void; onMusic?: () => void }) {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pb-2 bg-[#faf8f3]/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <button onClick={onMenu} className="w-11 h-11 rounded-xl border-2 border-ink bg-white shadow-neo flex items-center justify-center active:scale-95 transition">
          <MenuIcon className="w-5 h-5 text-gold" />
        </button>

        <motion.h1 className="text-lg font-black tracking-wider animate-name select-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          NEXA LOCK
        </motion.h1>

        <div className="flex items-center gap-2">
          <button onClick={onMusic} className="w-11 h-11 rounded-xl border-2 border-ink bg-white shadow-neo flex items-center justify-center active:scale-95 transition">
            <MusicIcon className="w-5 h-5 text-mint" />
          </button>
          <div className="w-11 h-11 rounded-xl border-2 border-ink bg-white shadow-neo flex items-center justify-center">
            <VirusIcon className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>
    </header>
  );
}
