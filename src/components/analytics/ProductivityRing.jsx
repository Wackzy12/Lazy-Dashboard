import { motion } from "framer-motion"

export default function ProductivityRing({
  percentage,
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
        initial={{
            strokeDashoffset: circumference,
        }}
        animate={{
            strokeDashoffset,
        }}
        transition={{
            duration: 1,
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
      </div>
    </div>
  )
}