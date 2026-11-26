import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ devices: [], error: "Supabase not configured" });
  }

  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .order("last_seen_at", { ascending: false });

  if (error) {
    return NextResponse.json({ devices: [], error: error.message }, { status: 500 });
  }

  const now = Date.now();
  const devices = (data || []).map((d: any) => ({
    id: d.id,
    name: d.name,
    model: d.model,
    battery: d.battery ?? 0,
    ip: d.ip,
    lastSeenAt: d.last_seen_at,
    lastSeen: d.last_seen_at
      ? now - d.last_seen_at < 45000
        ? "Baru saja"
        : new Date(d.last_seen_at).toLocaleString("id-ID")
      : "-",
    online: d.last_seen_at ? now - d.last_seen_at < 45000 : false,
  }));

  return NextResponse.json({ devices });
}

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { deviceId, name, model, battery, ip } = body;

    if (!deviceId) {
      return NextResponse.json({ error: "deviceId required" }, { status: 400 });
    }

    const now = Date.now();

    const { error: upsertError } = await supabase.from("devices").upsert(
      {
        id: deviceId,
        name: name || "Unknown Device",
        model: model || "Android",
        battery: battery ?? 0,
        ip: ip || "-",
        last_seen_at: now,
      },
      { onConflict: "id" }
    );

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    const { data: cmds } = await supabase
      .from("commands")
      .select("*")
      .eq("device_id", deviceId)
      .eq("executed", false)
      .order("created_at", { ascending: true });

    if (cmds && cmds.length > 0) {
      const ids = cmds.map((c: any) => c.id);
      await supabase.from("commands").update({ executed: true }).in("id", ids);
    }

    return NextResponse.json({
      ok: true,
      device: { id: deviceId, name, model, battery, ip, lastSeenAt: now },
      commands: (cmds || []).map((c: any) => ({
        id: c.id,
        type: c.type,
        payload: c.payload || {},
        createdAt: c.created_at,
      })),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "bad request" }, { status: 400 });
  }
}
