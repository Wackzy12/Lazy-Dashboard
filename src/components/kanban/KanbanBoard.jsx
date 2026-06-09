import KanbanColumn from "./KanbanColumn"
import DndContextWrapper from "./DndContextWrapper"
import { usePreferences } from "../../features/preferences/usePreferences"

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

  const { autoSort } = usePreferences()

  const sortTasks = (tasks) => {
  const priorityOrder = {
      urgent: 1,
      high: 2,
      medium: 3,
      low: 4,
    }

    return [...tasks].sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    )
  }

  const todo = autoSort
    ? sortTasks(
        tasks.filter(
          t => t.status === "todo"
        )
      )
    : tasks.filter(
        t => t.status === "todo"
      )

  const inProgress = autoSort
    ? sortTasks(
        tasks.filter(
          t => t.status === "in_progress"
        )
      )
    : tasks.filter(
        t => t.status === "in_progress"
      )

  const done = autoSort
    ? sortTasks(
        tasks.filter(
          t => t.status === "done"
        )
      )
    : tasks.filter(
        t => t.status === "done"
      )


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