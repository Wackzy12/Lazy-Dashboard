import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function TaskCard({
  task,
  onEdit,
  onDelete
}) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition cursor-grab active:cursor-grabbing"
    >
      <h3 className="font-medium">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-slate-400 mt-1">
          {task.description}
        </p>
      )}

      <div className="flex justify-between mt-3 text-xs text-slate-400">
        <span>{task.priority}</span>
        <span>{task.status}</span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(task.id, task)
            toast.success("Task updated")
          }}
          className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(task.id)
            toast.success("Task deleted")
          }}
          className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}