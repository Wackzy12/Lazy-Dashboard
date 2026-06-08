import { Bell } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../features/theme/ThemeContext"

export default function Header() {
  const { user } = useAuth()
  const { theme } = useTheme()

  const isDark = theme === "dark"

  return (
    <header
      className={`
        h-20 px-6 flex items-center justify-between border-b transition-colors
        ${
          isDark
            ? "bg-slate-950 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }
      `}
    >
      <div>
        <h2 className="text-2xl font-bold">
          Lazy Dashboard
        </h2>

        <p
          className={
            isDark
              ? "text-slate-400 text-sm"
              : "text-slate-500 text-sm"
          }
        >
          Stay productive today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`p-2 rounded-lg transition ${
            isDark
              ? "hover:bg-slate-800"
              : "hover:bg-slate-100"
          }`}
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
            {user?.email?.[0]?.toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}