interface Props {
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  theme?: "dark" | "light";
}

const COLOR_MAP = {
  light: {
    background: "rgba(0, 0, 0, 0.2)",
    color: "rgba(0, 0, 0, 0.8)",
  },
  dark: {
    background: "rgba(255, 255, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.8)",
  },
};

export default function DummyArea({
  width = "100%",
  height = "100%",
  theme = "light",
  children,
}: Props) {
  const { background, color } = COLOR_MAP[theme];
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "2px",
        border: "1px solid #ccc",
        backgroundImage: `repeating-linear-gradient(
          135deg,
          ${background} 0px,
          ${background} 1px,
          transparent 1px,
          transparent 6px
        )`,
        backgroundSize: "8px 8px",
        backgroundPosition: "top left",
        color,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
