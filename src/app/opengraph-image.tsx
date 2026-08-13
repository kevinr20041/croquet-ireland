import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_URL = "https://q41s7axx6lc9r6rm.public.blob.vercel-storage.com/brand/cai-logo.png";

export default async function OpengraphImage() {
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
          backgroundImage: "linear-gradient(135deg, #E9F9EE 0%, #FFFFFF 55%, #E4F0FF 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 32,
            padding: "64px 96px",
            boxShadow: "0 20px 60px rgba(20,35,24,0.12)",
            border: "1px solid #CDEED8",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} width={220} height={220} style={{ objectFit: "contain" }} alt="" />
          <div
            style={{
              marginTop: 32,
              fontSize: 56,
              fontWeight: 700,
              color: "#142318",
              textAlign: "center",
            }}
          >
            Croquet Association of Ireland
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 28,
              color: "#44604A",
              textAlign: "center",
            }}
          >
            The governing body for the sport of croquet in Ireland
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
