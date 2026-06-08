import { useTheme } from "../../features/theme/ThemeContext"

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card title="Total Tasks" value={stats.total} />
      <Card title="Completed" value={stats.completed} />
      <Card title="In Progress" value={stats.inProgress} />
      <Card title="Overdue" value={stats.overdue} />
    </div>
  )
}

function Card({ title, value }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`
        p-4 rounded-xl border transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <p
        className={
          isDark
            ? "text-slate-400 text-sm"
            : "text-slate-500 text-sm"
        }
      >
        {title}
      </p>

      <h2
        className={`text-2xl font-bold mt-2 ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        {value}
      </h2>
    </div>
  )
}