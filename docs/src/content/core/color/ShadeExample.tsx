import { shade } from "@fewings/core/color";

const originColor = "#de4343";
const colors = [
  {
    color: shade(originColor, -30),
    value: -30,
  },
  {
    color: shade(originColor, 0),
    value: 0,
  },
  {
    color: shade(originColor, 30),
    value: 30,
  },
];

const ShadeExample = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        padding: 40,
      }}
    >
      {colors.map(({ color, value }) => (
        <div
          key={value}
          style={{
            backgroundColor: color,
            color: "white",
            width: 200,
            height: 80,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>{color}</div>
          <div
            style={{
              fontSize: 14,
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShadeExample;
