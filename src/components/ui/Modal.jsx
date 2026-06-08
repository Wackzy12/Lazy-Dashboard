import { useTheme } from "../../features/theme/ThemeContext"

export default function Modal({
  open,
  onClose,
  title,
  children,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div
        className={`
          w-full max-w-lg rounded-2xl border transition-colors
          ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200 shadow-xl"
          }
        `}
      >
        <div
          className={`
            flex items-center justify-between p-5 border-b
            ${
              isDark
                ? "border-slate-800"
                : "border-slate-200"
            }
          `}
        >
          <h2
            className={`font-semibold text-lg ${
              isDark
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className={
              isDark
                ? "text-slate-400 hover:text-white transition"
                : "text-slate-500 hover:text-slate-900 transition"
            }
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}