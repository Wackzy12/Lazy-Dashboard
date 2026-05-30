import { useState } from "react"
import KanbanBoard from "../components/kanban/KanbanBoard"
import TaskModal from "../components/kanban/TaskModal"
import { useTasks } from "../features/tasks/hooks"
import { toast, Toaster } from "sonner"
import { getTaskStats } from "../features/analytics/utils"
import StatsCards from "../components/analytics/StatsCards"
import Pomodoro from "../components/pomodoro/Pomodoro"

export default function Dashboard() {
  const {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
  } = useTasks()

  const [open, setOpen] = useState(false)

  const stats = getTaskStats(tasks)

  const [filter, setFilter] = useState("all")

  const filteredTasks =
  filter === "all"
    ? tasks
    : tasks.filter(t => t.status === filter)

  if (loading) {
    return <div>Loading tasks...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back 👋
          </h1>

          <p className="text-slate-400 mt-1">
            Manage your tasks efficiently.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
        >
          + New Task
        </button>
      </div>
      
      <StatsCards stats={stats} />

      <Pomodoro />

      
      
      {/* Kanban Board */}
      <KanbanBoard
        tasks={filteredTasks}
        onUpdate={editTask}
        onDelete={removeTask}
      />

      {/* Create Task Modal */}
      <TaskModal
        initialValues={null}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (task) => {
          await addTask({
            ...task,
            status: "todo",
          })

          toast.success("Task created")

          setOpen(false)
        }}
      />
    </div>
  )
}