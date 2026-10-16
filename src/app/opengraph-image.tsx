import { ImageResponse } from "next/og";

export const alt = "Abhimanyu Patel: quant and fintech builder, writer of poet philosopher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", background: "#ECEFEA", color: "#16231F", paddingLeft: 140, position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 2, background: "#B22A24" }} />
        <div style={{ position: "absolute", left: 70, top: 0, bottom: 0, width: 2, background: "#B22A24" }} />
        <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -3 }}>Abhimanyu Patel</div>
        <div style={{ marginTop: 36, fontSize: 36, maxWidth: 880, lineHeight: 1.3, color: "#4E5C57" }}>
          I model markets and write essays. Both begin by asking what a thing is actually worth.
        </div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#B22A24" }}>poet philosopher</div>
      </div>
    ),
    size,
  );
}
