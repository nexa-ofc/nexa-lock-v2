import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { deviceId, type, payload } = body;

    if (!deviceId || !type) {
      return NextResponse.json({ error: "deviceId and type required" }, { status: 400 });
    }

    await supabase.from("devices").upsert(
      {
        id: deviceId,
        name: "Device",
        model: "Android",
        last_seen_at: Date.now(),
      },
      { onConflict: "id" }
    );

    const { data, error } = await supabase
      .from("commands")
      .insert({
        device_id: deviceId,
        type,
        payload: payload || {},
        executed: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, command: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "bad request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ commands: [] });
  }

  const deviceId = req.nextUrl.searchParams.get("deviceId");
  if (!deviceId) {
    return NextResponse.json({ error: "deviceId required" }, { status: 400 });
  }

  const { data } = await supabase
    .from("commands")
    .select("*")
    .eq("device_id", deviceId)
    .eq("executed", false)
    .order("created_at", { ascending: true });

  return NextResponse.json({ commands: data || [] });
}
