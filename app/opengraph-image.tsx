import { ImageResponse } from "next/og";
import { getProfile, getSettings } from "@/lib/data/public";

export const runtime = "edge";
export const alt = "Developer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  const title = `${profile.name} — ${profile.role}`;
  const subtitle = settings.site_description || "Fullstack developer portfolio";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #050816 0%, #0b1d2e 100%)",
          fontFamily: "monospace"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#a5f3fc", fontSize: 24, marginBottom: 24 }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "#22d3ee" }} />
          open for work
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: "#ffffff", lineHeight: 1.08, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#94a3b8", marginTop: 24, maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>
    ),
    size
  );
}