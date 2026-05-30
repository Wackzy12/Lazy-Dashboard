import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"

export default function KanbanColumn({
  id,
  title,
  tasks,
  onUpdate,
  onDelete,
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
      
      {tasks.length === 0 && (
        <p className="text-sm text-slate-500">
          No tasks yet
        </p>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard 
          key={task.id} 
          task={task} 
          onUpdate={onUpdate}
          onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}