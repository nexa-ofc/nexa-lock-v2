"use client";
import { motion } from "framer-motion";
import HomeIcon from "./icons/HomeIcon";
import DeviceIcon from "./icons/DeviceIcon";
import BuildIcon from "./icons/BuildIcon";

const tabs = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "devices", label: "Devices", Icon: DeviceIcon },
  { id: "build", label: "Build", Icon: BuildIcon },
] as const;

export default function BottomNav({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <nav className="fixed bottom-4 left-3 right-3 z-50">
      <div className="flex items-center justify-around bg-white border-2 border-ink rounded-full px-2 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} className="relative flex flex-col items-center justify-center min-w-[72px] py-1.5">
              {isActive && (
                <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-full bg-mint border-2 border-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <tab.Icon className={`relative z-10 w-5 h-5 ${isActive ? "text-white" : "text-muted"}`} />
              <span className={`relative z-10 text-[10px] font-bold mt-0.5 ${isActive ? "text-white" : "text-muted"}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
