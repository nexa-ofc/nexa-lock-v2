"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppBar from "./components/AppBar";
import BottomNav from "./components/BottomNav";
import AccountCard from "./components/AccountCard";
import HeroVideo from "./components/HeroVideo";
import HomeExtras from "./components/HomeExtras";
import DevicesView from "./components/DevicesView";
import BuildView from "./components/BuildView";
import AuthGate from "./components/AuthGate";

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("home");

  useEffect(() => {
    if (sessionStorage.getItem("nlx_token")) setAuthed(true);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <AuthGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen pb-28 bg-[#faf8f3]">
      <AppBar />
      <main className="px-3 space-y-4">
        <AnimatePresence mode="wait">
          {tab === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <HeroVideo />
              <AccountCard />
              <HomeExtras />
            </motion.div>
          )}
          {tab === "devices" && (
            <motion.div key="devices" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <DevicesView />
            </motion.div>
          )}
          {tab === "build" && (
            <motion.div key="build" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <BuildView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
