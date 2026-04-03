import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06080d 0%, #0c0f17 50%, #111622 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(167,139,250,0.2))",
            border: "2px solid rgba(96,165,250,0.3)",
            marginBottom: "32px",
            fontSize: "32px",
            fontWeight: 800,
            color: "#60a5fa",
          }}
        >
          SF
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#eef2ff",
            marginBottom: "12px",
          }}
        >
          Sean Fritsch
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 500,
            color: "#64748b",
            marginBottom: "40px",
          }}
        >
          Portfolio SISR — BTS SIO
        </div>

        {/* Skills bar */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["Systèmes", "Réseaux", "Cybersécurité", "Cloud"].map((s) => (
            <div
              key={s}
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                background: "rgba(96,165,250,0.08)",
                border: "1px solid rgba(96,165,250,0.2)",
                color: "#60a5fa",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
