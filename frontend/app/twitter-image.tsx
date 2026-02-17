import { ImageResponse } from "next/og";

export const alt = "Marcelo Retana - Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const interBold = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf"
  ).then((res) => res.arrayBuffer());

  const interRegular = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000",
        padding: "60px 80px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: 36, fontWeight: 500, color: "#fff", fontFamily: "Inter" }}>M</span>
        <span
          style={{
            fontSize: 36,
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Inter",
          }}
        >
          /
        </span>
        <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", fontFamily: "Inter" }}>R</span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            fontFamily: "Inter",
          }}
        >
          I build modern websites and apps that convert visitors into customers.
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          Full-stack development with Next.js. SEO-optimized, fast, and built for lead generation.
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          marceloretana.com
        </span>
        <div
          style={{
            display: "flex",
            backgroundColor: "#facc15",
            padding: "8px 24px",
            borderRadius: "4px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "#000",
              fontWeight: 700,
              fontFamily: "Inter",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Book a Call
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
      ],
    }
  );
}
