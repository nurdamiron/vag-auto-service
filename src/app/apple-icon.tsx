import { ImageResponse } from "next/og";

/** Иконка для «на экран Домой» в iOS — фирменные цвета, без внешних файлов */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1b2b",
          color: "#ea5a1e",
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        VAG
      </div>
    ),
    size
  );
}
