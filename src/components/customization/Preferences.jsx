import { useTheme } from "../../features/theme/ThemeContext"

function Toggle({
  label,
  value,
  onChange,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex items-center justify-between">
      <span
        className={
          isDark
            ? "text-slate-300"
            : "text-slate-700"
        }
      >
        {label}
      </span>

      <button
        onClick={onChange}
        className={`
          w-12 h-6 flex items-center rounded-full p-1 transition
          ${
            value
              ? "bg-blue-600"
              : isDark
              ? "bg-slate-700"
              : "bg-slate-300"
          }
        `}
      >
        <div
          className={`
            w-4 h-4 bg-white rounded-full transform transition
            ${
              value
                ? "translate-x-6"
                : ""
            }
          `}
        />
      </button>
    </div>
  )
}

export default function Preferences({
  settings,
  toggleSetting,
  saveSettings,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`
        rounded-xl p-6 space-y-4 border transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <h2
        className={`text-xl font-semibold ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        Preferences
      </h2>

      <Toggle
        label="Auto Sort Tasks"
        value={settings.autoSort}
        onChange={() =>
          toggleSetting("autoSort")
        }
      />

      <button
        onClick={saveSettings}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
        "
      >
        Save Preferences
      </button>
    </div>
  )
}