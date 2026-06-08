import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"
import { useTheme } from "../../features/theme/ThemeContext"

export default function KanbanColumn({
  id,
  title,
  tasks,
  onUpdate,
  onDelete,
  onEdit,
}) {
  const { setNodeRef } = useDroppable({
    id,
  })

  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-2xl p-4 border min-h-100 flex flex-col h-[58vh] transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <h2
        className={`
          sticky top-0 font-semibold mb-4 z-10
          ${
            isDark
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-900"
          }
        `}
      >
        {title}
      </h2>

      {tasks.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">
            📭
          </div>

          <h3
            className={
              isDark
                ? "font-medium text-white"
                : "font-medium text-slate-900"
            }
          >
            No Tasks
          </h3>

          <p
            className={
              isDark
                ? "text-slate-400 text-sm"
                : "text-slate-500 text-sm"
            }
          >
            Create your first task.
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}