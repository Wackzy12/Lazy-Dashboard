import { useEffect, useState } from "react"

export default function Pomodoro() {
  const [time, setTime] = useState(25 * 60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
      <h2 className="text-xl font-bold mb-4">
        Pomodoro Timer
      </h2>

      <div className="text-4xl font-bold mb-4">
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>

      <button
        onClick={() => setRunning(!running)}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        {running ? "Pause" : "Start"}
      </button>

      <button
        onClick={() => {
          setTime(25 * 60)
          setRunning(false)
        }}
        className="ml-2 bg-slate-700 px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  )
}