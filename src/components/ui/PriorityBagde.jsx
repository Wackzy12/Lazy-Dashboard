export default function PriorityBadge({
  priority,
}) {
  const styles = {
    low: "bg-gray-600",
    medium: "bg-blue-600",
    high: "bg-orange-600",
    urgent: "bg-red-600",
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${styles[priority]}`}
    >
      {priority}
    </span>
  )
}