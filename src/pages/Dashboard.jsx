import { useState } from "react"
import KanbanBoard from "../components/kanban/KanbanBoard"
import TaskModal from "../components/kanban/TaskModal"
import { useTasks } from "../features/tasks/hooks"
import { toast, Toaster } from "sonner"
import { getTaskStats } from "../features/analytics/utils"
import StatsCards from "../components/analytics/StatsCards"
import SkeletonCard from "../components/ui/SkeletonCard"
import ProductivityRing from "../components/analytics/ProductivityRing"
import SearchBar from "../components/filters/SearchBar"
import TaskFilter from "../components/filters/TaskFilter"

export default function Dashboard() {
  const {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
  } = useTasks()

  const [selectedTask, setSelectedTask] = useState(null)

  const [open, setOpen] = useState(false)

  const handleEdit = (task) => {
    setSelectedTask(task)
    setOpen(true)
  }

  const stats = getTaskStats(tasks)

  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

   const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter(t => t.status === filter)


  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
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

      <div className="flex flex-col md:flex-row gap-4">
        <TaskFilter
          filter={filter}
          setFilter={setFilter}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <KanbanBoard
            tasks={filteredTasks}
            onUpdate={editTask}
            onDelete={removeTask}
            onEdit={handleEdit}
            filter={filter}
            search={search}
          />
        </div>

        <div>
          <ProductivityRing
            percentage={stats.productivity}
          />
        </div>
      </div>

      {/* Create Task Modal */}
      <TaskModal
        initialValues={selectedTask}
        open={open}
        onClose={() => {
          setOpen(false)
          setSelectedTask(null)
        }}
        onSubmit={async (task) => {
          if (selectedTask) {
            await editTask(selectedTask.id, task)
            toast.success("Task updated")
          } else {
            await addTask({
              ...task,
              status: "todo",
            })
            toast.success("Task created")
          }

          setOpen(false)
          setSelectedTask(null)
        }}
      />
    </div>
  )
}