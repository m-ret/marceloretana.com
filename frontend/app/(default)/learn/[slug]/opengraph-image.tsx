import { ImageResponse } from "next/og";
import { getPseoContent } from "@/lib/pseo";
import type { Stack } from "@/lib/pseo-types";

export const alt = "Step-by-step guide by Marcelo Retana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getPseoContent<Stack>("stacks", slug);

  const title = data?.seo.title ?? "Guide";
  const difficulty = data?.difficulty ?? "beginner";
  const estimatedTime = data?.estimated_time ?? "";

  const interBold = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf"
  ).then((res) => res.arrayBuffer());

  const interRegular = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
  ).then((res) => res.arrayBuffer());

  const diffColors: Record<string, string> = {
    beginner: "#4ade80",
    intermediate: "#facc15",
    advanced: "#f87171",
  };
  const dc = diffColors[difficulty] ?? "#facc15";

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
          Step-by-Step Guide
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: title.length > 60 ? 40 : 48,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            fontFamily: "Inter",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: `${dc}20`,
              border: `1px solid ${dc}50`,
              padding: "4px 12px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: dc,
                fontFamily: "Inter",
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {difficulty}
            </span>
          </div>
          {estimatedTime && (
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(250,204,21,0.15)",
                border: "1px solid rgba(250,204,21,0.3)",
                padding: "4px 12px",
                borderRadius: "4px",
              }}
            >
              <span
                style={{ fontSize: 14, color: "#facc15", fontFamily: "Inter", fontWeight: 400 }}
              >
                {estimatedTime}
              </span>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
