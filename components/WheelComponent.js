"use client"

export default function WheelComponent({
  items,
  selected,
  onChange,
}) {
  return (
    <div
      style={{
        height: "180px",
        width: "80px",
        overflowY: "auto",
        border: "1px solid #ccc",
        textAlign: "center",
      }}
    >
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onChange(item)}
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            cursor: "pointer",
            background:
              selected === item
                ? "#4CAF50"
                : "white",
            color:
              selected === item
                ? "white"
                : "black",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}