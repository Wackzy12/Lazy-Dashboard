import KanbanBoard from "../components/kanban/KanbanBoard"
import { useTasks } from "../features/tasks/hooks"

export default function Dashboard() {
  const { tasks, loading, editTask } = useTasks()

  if (loading) {
    return <div>Loading tasks...</div>
  }

  return (
    <div className="space-y-6">
      <KanbanBoard
        tasks={tasks}
        onUpdate={editTask}
      />
    </div>
  )
}