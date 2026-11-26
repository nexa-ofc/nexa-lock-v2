"use client";
import { motion } from "framer-motion";

export default function AccountCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-2xl border-2 border-ink bg-gradient-to-br from-gold to-mint flex items-center justify-center text-white font-black text-lg shadow-neo">
            NX
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-ink bg-white flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c8a84b" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted mb-0.5">Selamat datang,</div>
          <div className="font-black text-base truncate">nexaXzar</div>
          <div className="mt-1 inline-flex px-2.5 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-[11px] font-bold text-gold">
            Developer
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-mint/40 bg-mint-soft">
          <span className="w-2 h-2 rounded-full bg-mint pulse-dot" />
          <span className="text-[11px] font-black text-mint">AKTIF</span>
        </div>
      </div>
    </motion.div>
  );
}
