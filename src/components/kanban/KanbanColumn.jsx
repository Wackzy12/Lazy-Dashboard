import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"

export default function KanbanColumn({
  id,
  title,
  tasks,
}) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-900 rounded-2xl p-4 border border-slate-800 min-h-100"
    >
      <h2 className="font-semibold mb-4">
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}