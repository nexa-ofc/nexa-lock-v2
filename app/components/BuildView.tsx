"use client";
import { useState } from "react";

export default function BuildView() {
  const [name, setName] = useState("NexaApp");
  const [pkg, setPkg] = useState("com.nexa.app");
  const [version, setVersion] = useState("1.0.0");
  const [logs, setLogs] = useState<string[]>([]);
  const [building, setBuilding] = useState(false);

  function startBuild() {
    if (building) return;
    setBuilding(true);
    setLogs([]);
    const steps = [
      "Initializing NexaBuild...",
      `Reading package: ${pkg}`,
      "Compiling sources...",
      "Linking libraries...",
      "Signing APK...",
      "Packaging resources...",
      `BUILD SUCCESS ✓  ${name}-v${version}.apk`,
    ];
    let i = 0;
    const t = setInterval(() => {
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${steps[i]}`]);
      i++;
      if (i >= steps.length) {
        clearInterval(t);
        setBuilding(false);
      }
    }, 700);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black">nexa-Build</h2>

      <div className="card p-4 space-y-3">
        <div>
          <label className="text-xs text-muted font-medium">Nama APK</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 border-b-2 border-gold/30 focus:border-gold outline-none py-1.5 text-sm bg-transparent" />
        </div>
        <div>
          <label className="text-xs text-muted font-medium">Package</label>
          <input value={pkg} onChange={(e) => setPkg(e.target.value)} className="w-full mt-1 border-b-2 border-gold/30 focus:border-gold outline-none py-1.5 text-sm bg-transparent" />
        </div>
        <div>
          <label className="text-xs text-muted font-medium">Version</label>
          <input value={version} onChange={(e) => setVersion(e.target.value)} className="w-full mt-1 border-b-2 border-gold/30 focus:border-gold outline-none py-1.5 text-sm bg-transparent" />
        </div>
        <button
          onClick={startBuild}
          disabled={building}
          className="w-full py-3 rounded-full font-black text-sm bg-gradient-to-r from-gold to-gold-light text-ink border-2 border-ink shadow-neo disabled:opacity-50"
        >
          {building ? "Building..." : "▶ MULAI BUILD"}
        </button>
      </div>

      <div className="card p-3">
        <div className="text-xs font-bold text-muted mb-2">Terminal</div>
        <div className="bg-ink text-mint font-mono text-[11px] rounded-xl p-3 min-h-[140px] max-h-[220px] overflow-y-auto whitespace-pre-wrap">
          {logs.length === 0 ? "Menunggu build..." : logs.join("\n")}
        </div>
      </div>
    </div>
  );
}
