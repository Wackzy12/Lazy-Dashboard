import { useTheme } from "../../features/theme/ThemeContext"

export default function PriorityBadge({
  priority,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const level = priority?.toLowerCase()

  const styles = {
    low: isDark
      ? "bg-slate-700 text-slate-200"
      : "bg-slate-200 text-slate-700",

    medium: isDark
      ? "bg-green-600 text-white"
      : "bg-green-100 text-green-700",

    high: isDark
      ? "bg-blue-600 text-white"
      : "bg-blue-100 text-blue-700",

    urgent: isDark
      ? "bg-red-600 text-white"
      : "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`
        px-2 py-1 rounded-md text-xs font-medium
        ${styles[level] || "bg-slate-200 text-slate-700"}
      `}
    >
      {priority}
    </span>
  )
}