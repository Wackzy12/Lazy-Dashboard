import { useState } from "react"

export default function Preferences() {
  const [compactMode, setCompactMode] =
    useState(false)

  const [animations, setAnimations] =
    useState(true)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Preferences
      </h2>

      {/* Compact Mode */}
      <div className="flex justify-between items-center">
        <span>Compact Cards</span>

        <button
          onClick={() =>
            setCompactMode(!compactMode)
          }
          className={`px-3 py-1 rounded ${
            compactMode
              ? "bg-blue-600"
              : "bg-slate-700"
          }`}
        >
          {compactMode ? "On" : "Off"}
        </button>
      </div>

      {/* Animations */}
      <div className="flex justify-between items-center">
        <span>Animations</span>

        <button
          onClick={() =>
            setAnimations(!animations)
          }
          className={`px-3 py-1 rounded ${
            animations
              ? "bg-blue-600"
              : "bg-slate-700"
          }`}
        >
          {animations ? "On" : "Off"}
        </button>
      </div>
    </div>
  )
}