import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import PriorityBadge from "../ui/PriorityBadge"
import { toast } from "sonner"

export default function TaskCard({
  task,
  onEdit,
  onDelete
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  const overdue =
  task.status !== "done" &&
  task.due_date &&
  new Date(task.due_date).setHours(
    23,
    59,
    59,
    999
  ) < Date.now()

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{
      opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        w-full
        bg-slate-800
        p-4
        rounded-xl
        border
        border-slate-700
        hover:border-slate-600
        relative
        transition-all
        ${
          isDragging
            ? "shadow-2xl z-50"
            : ""
        }
      `}
    >
          {
        overdue && (
          <span className="absolute top-2 right-2 text-xs bg-red-600 text-white px-1 rounded">
            Overdue
          </span>
      )}
      
      <h3 className="font-medium">
        <div
          {...listeners}
          {...attributes}
          className="
            flex items-center
            gap-2
            text-xs
            text-slate-500
            cursor-grab
            active:cursor-grabbing
            mb-2
          "
        >
          <span>⋮⋮</span>
          <span>Move Task</span>
        </div>
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-slate-400 mt-1">
          {task.description}
        </p>
      )}

      {task.due_date && (
        <p className="text-sm text-slate-400 mt-1">
          Due:{" "}
          {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}

      <div className="flex justify-between items-center mt-3">
        <PriorityBadge priority={task.priority} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(task)
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
    </motion.div>
  )
}