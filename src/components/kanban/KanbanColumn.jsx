import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"

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


  return (
    <div
      ref={setNodeRef}
      className="bg-slate-900 rounded-2xl p-4 border border-slate-800 min-h-100 flex flex-col h-[58vh]"
    >
      <h2 className="sticky top-0 bg-slate-900 font-semibold mb-4">
        {title}
      </h2>
      
      {tasks.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">
            📭
          </div>

          <h3 className="font-medium">
            No Tasks
          </h3>

          <p className="text-slate-400 text-sm">
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