import Pomodoro from "../components/pomodoro/Pomodoro"

export default function PomodoroPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Pomodoro Timer
      </h1>

      <Pomodoro />
    </div>
  )
}