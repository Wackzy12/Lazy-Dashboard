import { useTheme } from "../../features/theme/ThemeContext"

export default function SkeletonCard() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`
        animate-pulse
        rounded-xl
        h-28
        border
        ${
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-slate-200 border-slate-300"
        }
      `}
    />
  )
}