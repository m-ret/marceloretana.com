import { ImageResponse } from "next/og";
import { getPseoContent } from "@/lib/pseo";
import type { Comparison } from "@/lib/pseo-types";

export const alt = "Tool comparison by Marcelo Retana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getPseoContent<Comparison>("comparisons", slug);

  const toolA = data?.tools[0]?.name ?? "Tool A";
  const toolB = data?.tools[1]?.name ?? "Tool B";

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
      {/* Top: Logo + Label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: 36, fontWeight: 500, color: "#fff", fontFamily: "Inter" }}>
            M
          </span>
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
          <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", fontFamily: "Inter" }}>
            R
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Comparison
        </span>
      </div>

      {/* Center: Tool A vs Tool B */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Inter",
            }}
          >
            {toolA}
          </span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 400,
              color: "rgba(250,204,21,0.8)",
              fontFamily: "Inter",
            }}
          >
            vs
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Inter",
            }}
          >
            {toolB}
          </span>
        </div>
        <span
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          Side-by-side comparison with scores, pros & cons
        </span>
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
        <span
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          Marcelo Retana
        </span>
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
