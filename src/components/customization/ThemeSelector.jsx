export default function ThemeSelector({
  theme,
  setTheme,
}) {
  const isDark = theme === "dark"

  return (
    <div
      className={`
        rounded-xl p-6 border transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        Theme
      </h2>

      <div className="flex gap-3">
        <button
          onClick={() => setTheme("dark")}
          className={`
            px-4 py-2 rounded-lg transition
            ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : isDark
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-100 text-slate-700 border border-slate-200"
            }
          `}
        >
          Dark
        </button>

        <button
          onClick={() => setTheme("light")}
          className={`
            px-4 py-2 rounded-lg transition
            ${
              theme === "light"
                ? "bg-blue-600 text-white"
                : isDark
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-100 text-slate-700 border border-slate-200"
            }
          `}
        >
          Light
        </button>
      </div>

      <p
        className={`text-sm mt-3 ${
          isDark
            ? "text-slate-400"
            : "text-slate-500"
        }`}
      >
        Current theme:{" "}
        <span className="font-medium capitalize">
          {theme}
        </span>
      </p>
    </div>
  )
}