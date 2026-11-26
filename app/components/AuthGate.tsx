"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEED_USER = "nexaXzar";
const SEED_PASS = "nexa-oficial28";

export default function AuthGate({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState<"finger" | "login">("finger");
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [robotMood, setRobotMood] = useState<"idle" | "smile" | "yawn" | "sad">("idle");
  const progressTimer = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("nlx_accounts")) {
      localStorage.setItem(
        "nlx_accounts",
        JSON.stringify([{ username: SEED_USER, password: SEED_PASS, role: "Developer" }])
      );
    }
  }, []);

  useEffect(() => {
    if (step !== "login") return;
    const id = setInterval(() => {
      const moods = ["idle", "smile", "yawn"] as const;
      setRobotMood(moods[Math.floor(Math.random() * moods.length)]);
      setTimeout(() => setRobotMood("idle"), 1100);
    }, 3800 + Math.random() * 2500);
    return () => clearInterval(id);
  }, [step]);

  function startHold() {
    setHolding(true);
    setProgress(0);
    const start = Date.now();
    progressTimer.current = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 3000) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(progressTimer.current);
        setHolding(false);
        setStep("login");
      }
    }, 30);
  }

  function endHold() {
    if (progress < 100) {
      clearInterval(progressTimer.current);
      setHolding(false);
      setProgress(0);
    }
  }

  function handleLogin() {
    setError("");
    if (!username || !password) {
      setError("Lengkapi semua field");
      setRobotMood("sad");
      return;
    }
    const accounts = JSON.parse(localStorage.getItem("nlx_accounts") || "[]");
    const found = accounts.find((a: any) => a.username === username && a.password === password);
    if (!found) {
      setError("Username atau password salah");
      setRobotMood("sad");
      return;
    }
    sessionStorage.setItem("nlx_token", "ok");
    localStorage.setItem("nlx_user", JSON.stringify(found));
    onSuccess();
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center p-6 relative">
      <AnimatePresence mode="wait">
        {step === "finger" && (
          <motion.div
            key="finger"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-col items-center"
          >
            <div className="text-2xl font-black tracking-widest text-gold mb-8">NEXA-LOCK</div>

            <button
              onTouchStart={startHold}
              onTouchEnd={endHold}
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              className="relative w-44 h-44 rounded-full border-2 border-gold/50 flex items-center justify-center bg-white shadow-soft active:scale-95 transition"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="88" cy="88" r="80"
                  fill="none"
                  stroke="#c8a84b"
                  strokeWidth="3.5"
                  strokeDasharray={502}
                  strokeDashoffset={502 - (502 * progress) / 100}
                  className="transition-all duration-75"
                  opacity={holding ? 1 : 0.25}
                />
              </svg>

              <svg width="78" height="88" viewBox="0 0 80 90" fill="none">
                <path d="M40 10 C25 10 15 22 15 38 C15 55 25 70 40 80 C55 70 65 55 65 38 C65 22 55 10 40 10" stroke="#c8a84b" strokeWidth="1.6" />
                <path d="M40 18 C28 18 20 28 20 40 C20 54 28 66 40 74 C52 66 60 54 60 40 C60 28 52 18 40 18" stroke="#2ead9f" strokeWidth="1.3" />
                <path d="M40 26 C32 26 26 33 26 42 C26 52 32 62 40 68 C48 62 54 52 54 42 C54 33 48 26 40 26" stroke="#c8a84b" strokeWidth="1.2" />
                <path d="M40 34 C35 34 32 38 32 44 C32 50 35 56 40 60 C45 56 48 50 48 44 C48 38 45 34 40 34" stroke="#2ead9f" strokeWidth="1.1" />
              </svg>

              {holding && <div className="absolute inset-0 rounded-full bg-mint/10 animate-pulse" />}
            </button>

            <div className="mt-6 text-sm text-muted font-medium">
              {holding ? `Tahan... ${Math.floor(progress)}%` : "Tahan untuk membuka kunci"}
            </div>
          </motion.div>
        )}

        {step === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            <div className="flex justify-center mb-5">
              <svg width="96" height="106" viewBox="0 0 100 110">
                <rect x="20" y="10" width="60" height="54" rx="12" fill="none" stroke="#c8a84b" strokeWidth="2" />
                <circle cx="38" cy="34" r="7.5" fill="none" stroke="#2ead9f" strokeWidth="1.5" />
                <circle cx="62" cy="34" r="7.5" fill="none" stroke="#2ead9f" strokeWidth="1.5" />
                <circle cx="38" cy="34" r="3.2" fill="#2ead9f" />
                <circle cx="62" cy="34" r="3.2" fill="#2ead9f" />
                {robotMood === "smile" && <path d="M38 50 Q50 60 62 50" fill="none" stroke="#c8a84b" strokeWidth="2" />}
                {robotMood === "yawn" && <ellipse cx="50" cy="53" rx="9" ry="7" fill="none" stroke="#c8a84b" strokeWidth="2" />}
                {robotMood === "sad" && <path d="M38 56 Q50 48 62 56" fill="none" stroke="#e05" strokeWidth="2" />}
                {robotMood === "idle" && <path d="M40 52 Q50 56 60 52" fill="none" stroke="#c8a84b" strokeWidth="1.5" />}
                <line x1="50" y1="10" x2="50" y2="3" stroke="#c8a84b" strokeWidth="1.5" />
                <circle cx="50" cy="3" r="2.8" fill="none" stroke="#2ead9f" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="card p-5 space-y-4">
              <div className="text-center text-lg font-black text-gold tracking-wide">MASUK</div>

              <div>
                <label className="text-xs text-muted font-medium">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full mt-1 bg-transparent border-b-2 border-gold/30 focus:border-gold outline-none py-2 text-sm"
                  placeholder="nexaXzar"
                />
              </div>

              <div>
                <label className="text-xs text-muted font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 bg-transparent border-b-2 border-gold/30 focus:border-gold outline-none py-2 text-sm pr-12"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-0 bottom-2 text-xs text-gold font-medium">
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && <div className="text-xs text-red-500 text-center font-medium">{error}</div>}

              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-full font-black text-sm bg-gradient-to-r from-gold to-gold-light text-ink border-2 border-ink shadow-neo active:translate-y-0.5 transition"
              >
                MASUK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
