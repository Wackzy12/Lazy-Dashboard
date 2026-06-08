import { useTheme } from "../../features/theme/ThemeContext"

export default function TaskFilter({
  filter,
  setFilter,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex gap-2 flex-wrap">
      {["all", "todo", "in_progress", "done"].map(
        (type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`
              px-3 py-1 rounded-lg transition-colors
              ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : isDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
              }
            `}
          >
            {type === "in_progress"
              ? "In Progress"
              : type.charAt(0).toUpperCase() +
                type.slice(1)}
          </button>
        )
      )}
    </div>
  )
}