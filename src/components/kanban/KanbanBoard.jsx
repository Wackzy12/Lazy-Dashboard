import KanbanColumn from "./KanbanColumn"
import DndContextWrapper from "./DndContextWrapper"

export default function KanbanBoard({
  tasks,
  onUpdate,
}) {
  const todo = tasks.filter(t => t.status === "todo")
  const inProgress = tasks.filter(t => t.status === "in_progress")
  const done = tasks.filter(t => t.status === "done")

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id
    const newStatus = over.id

    onUpdate(taskId, {
      status: newStatus,
    })
  }

  return (
    <DndContextWrapper onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KanbanColumn
          id="todo"
          title="To Do"
          tasks={todo}
        />

        <KanbanColumn
          id="in_progress"
          title="In Progress"
          tasks={inProgress}
        />

        <KanbanColumn
          id="done"
          title="Done"
          tasks={done}
        />
      </div>
    </DndContextWrapper>
  )
}