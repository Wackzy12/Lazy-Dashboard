export default function PriorityBadge({ priority }) {
  const level = priority?.toLowerCase()

  const styles = {
    low: "bg-gray-600",
    medium: "bg-green-600",
    high: "bg-blue-600",
    urgent: "bg-red-600",
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        styles[level] || "bg-slate-600"
      }`}
    >
      {priority}
    </span>
  )
}