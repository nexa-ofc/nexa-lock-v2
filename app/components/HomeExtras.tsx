"use client";

export default function HomeExtras() {
  return (
    <div className="space-y-4">
      {/* Global Chat + RAT */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <div className="text-2xl mb-1">💬</div>
          <div className="font-bold text-sm">Global Chat</div>
          <div className="text-[10px] text-muted mt-0.5">Coming soon</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl mb-1">📡</div>
          <div className="font-bold text-sm">RAT Panel</div>
          <div className="text-[10px] text-muted mt-0.5">Buka tab Devices</div>
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Online", color: "bg-mint" },
          { label: "Aktif", color: "bg-gold" },
          { label: "Terjaga", color: "bg-mint" },
        ].map((s) => (
          <div key={s.label} className="card p-3 text-center">
            <div className={`w-2 h-2 rounded-full ${s.color} pulse-dot mx-auto mb-1`} />
            <div className="text-[11px] font-bold">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Placeholder cuaca / berita / quran singkat */}
      <div className="card p-4">
        <div className="font-bold text-sm mb-1">Cuaca</div>
        <div className="text-xs text-muted">Jakarta · Open-Meteo siap dihubungkan</div>
      </div>
      <div className="card p-4">
        <div className="font-bold text-sm mb-1">Berita</div>
        <div className="text-xs text-muted">API berita siap dihubungkan</div>
      </div>
      <div className="card p-4">
        <div className="font-bold text-sm mb-1">Al-Qur’an</div>
        <div className="text-xs text-muted">Pilih surat & juz · API siap</div>
      </div>
    </div>
  );
}
