import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "A2PCheck - A2P 10DLC Campaign Pre-Scanner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #fafaf9 0%, #e7e5e4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="2" />
              <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
              <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "52px",
              fontWeight: "700",
              letterSpacing: "-0.03em",
              color: "#1c1917",
            }}
          >
            A2PCheck
          </span>
        </div>
        <span
          style={{
            fontSize: "24px",
            color: "#78716c",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Pre-scan your A2P 10DLC campaign registration. Catch rejection
          patterns and get actionable fixes.
        </span>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "16px",
          }}
        >
          <span
            style={{
              background: "#f0fdf4",
              color: "#16a34a",
              fontSize: "16px",
              fontWeight: "700",
              padding: "6px 16px",
              borderRadius: "8px",
            }}
          >
            GREEN
          </span>
          <span
            style={{
              background: "#fffbeb",
              color: "#d97706",
              fontSize: "16px",
              fontWeight: "700",
              padding: "6px 16px",
              borderRadius: "8px",
            }}
          >
            YELLOW
          </span>
          <span
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              fontSize: "16px",
              fontWeight: "700",
              padding: "6px 16px",
              borderRadius: "8px",
            }}
          >
            RED
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
