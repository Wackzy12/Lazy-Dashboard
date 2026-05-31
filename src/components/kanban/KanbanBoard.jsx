import KanbanColumn from "./KanbanColumn"
import DndContextWrapper from "./DndContextWrapper"

export default function KanbanBoard({
  tasks,
  onUpdate,
  onDelete,
  onEdit,
  filter,
  search,
}) {

  const matchesSearch = (task) => {
  if (!search) return true

  return (
    task.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    task.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
}
  const todo = tasks.filter(t => t.status === "todo" && matchesSearch(t, search))
  const inProgress = tasks.filter(t => t.status === "in_progress" && matchesSearch(t, search))
  const done = tasks.filter(t => t.status === "done" && matchesSearch(t, search))

  const visibleTasks =
  tasks.filter(matchesSearch)

  if (
    search &&
    visibleTasks.length === 0
  ) {
    return (
      <div className="text-center py-10">
        No tasks match your search.
      </div>
    )
  }

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
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />

        <KanbanColumn
          id="in_progress"
          title="In Progress"
          tasks={inProgress}  
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />

        <KanbanColumn
          id="done"
          title="Done"
          tasks={done}
          onUpdate={onUpdate}
          onDelete={onDelete} 
          onEdit={onEdit}
        />
      </div>
    </DndContextWrapper>
  )
}