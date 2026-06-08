import { useEffect, useState } from "react"
import { useTheme } from "../../features/theme/ThemeContext"

export default function Pomodoro() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [time, setTime] = useState(25 * 60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setRunning(false)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <div
      className={`
        p-6 rounded-xl border text-center transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        Pomodoro Timer
      </h2>

      <div
        className={`text-5xl font-bold mb-6 ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning(!running)}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2
            rounded-lg
            transition
          "
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setTime(25 * 60)
            setRunning(false)
          }}
          className={`
            px-5 py-2 rounded-lg transition
            ${
              isDark
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-900"
            }
          `}
        >
          Reset
        </button>
      </div>
    </div>
  )
}