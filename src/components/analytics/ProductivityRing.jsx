import { motion } from "framer-motion"
import { useTheme } from "../../features/theme/ThemeContext"

export default function ProductivityRing({
  percentage,
  averageCompletionTime,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const radius = 70
  const stroke = 10

  const normalizedRadius =
    radius - stroke * 2

  const circumference =
    normalizedRadius * 2 * Math.PI

  const strokeDashoffset =
    circumference -
    (percentage / 100) * circumference

  return (
    <div
      className={`
        rounded-xl p-6 flex flex-col items-center border transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke={
            isDark
              ? "#1e293b"
              : "#e2e8f0"
          }
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />

        <motion.circle
          stroke="#2563eb"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
          animate={{
            strokeDashoffset,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      </svg>

      <div className="mt-4 text-center">
        <h2
          className={`text-3xl font-bold ${
            isDark
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {percentage}%
        </h2>

        <p
          className={
            isDark
              ? "text-slate-400 text-sm"
              : "text-slate-500 text-sm"
          }
        >
          Productivity Score
        </p>

        <div
          className={`mt-6 pt-4 border-t ${
            isDark
              ? "border-slate-800"
              : "border-slate-200"
          }`}
        >
          <p
            className={
              isDark
                ? "text-slate-400 text-sm"
                : "text-slate-500 text-sm"
            }
          >
            Avg Completion Time
          </p>

          <h3
            className={`text-xl font-semibold mt-1 ${
              isDark
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            {averageCompletionTime || 0} Days
          </h3>
        </div>
      </div>
    </div>
  )
}