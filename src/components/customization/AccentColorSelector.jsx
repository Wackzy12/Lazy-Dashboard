import { useState } from "react"

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
]

export default function AccentColorSelector() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Accent Color
      </h2>

      <div className="flex gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`
              h-10
              w-10
              rounded-full
              ${color}
              ${
                selected === index
                  ? "ring-4 ring-white"
                  : ""
              }
            `}
          />
        ))}
      </div>
    </div>
  )
}