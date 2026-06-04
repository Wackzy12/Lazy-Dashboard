import { motion } from "framer-motion"

export default function ProductivityRing({
  percentage,
  averageCompletionTime,
}) {
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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center">
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        {/* Background Circle */}
        <circle
          stroke="#1e293b"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />

        {/* Progress Circle */}
        <motion.circle
        stroke="#3b82f6"
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
        <h2 className="text-3xl font-bold">
          {percentage}%
        </h2>

        <p className="text-slate-400 text-sm">
          Productivity Score
        </p>

        <div className="mt-6 pt-4 border-t border-slate-800">
          <p className="text-slate-400 text-sm">
            Avg Completion Time
          </p>

          <h3 className="text-xl font-semibold mt-1">
            {averageCompletionTime || 0} Days
          </h3>
          </div>
      </div>
    </div>
  )
}