import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { error } = await supabase.from("profiles").select("id", { count: "exact", head: true });
  return NextResponse.json(
    { ok: !error, service: "portfolio-cms", database: error ? "error" : "connected" },
    { status: error ? 500 : 200 }
  );
}