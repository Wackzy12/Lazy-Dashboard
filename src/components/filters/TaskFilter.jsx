export default function TaskFilter({
  filter,
  setFilter,
}) {
  return (
    <div className="flex gap-2">
      {["all", "todo", "in_progress", "done"].map(
        (type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded ${
              filter === type
                ? "bg-blue-600"
                : "bg-slate-800"
            }`}
          >
            {type}
          </button>
        )
      )}
    </div>
  )
}