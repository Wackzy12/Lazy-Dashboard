import { useTheme } from "../../features/theme/ThemeContext"

export default function SearchBar({
  search,
  setSearch,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search tasks..."
      className={`
        w-full md:w-80
        px-4 py-2
        rounded-lg
        border
        outline-none
        transition-colors
        focus:border-blue-500
        ${
          isDark
            ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm"
        }
      `}
    />
  )
}