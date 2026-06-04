import { useEffect, useState } from "react"
import { supabase } from "../../services/supabase"
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api"

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // GET CURRENT USER + LOAD TASKS
  useEffect(() => {
    const loadTasks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await getTasks(user.id)

      setTasks(data || [])
      setLoading(false)
    }

    loadTasks()
  }, [])

  // CREATE
  const addTask = async (task) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await createTask({
      ...task,
      user_id: user.id,
      completed_at: null,
    })

    setTasks((prev) => [data[0], ...prev])
  }

  // UPDATE
  const editTask = async (id, updates) => {
    const task = tasks.find((t) => t.id === id)

    let updatedData = { ...updates }

    // Task moved into Done
    if (
      updates.status === "done" &&
      task?.status !== "done"
    ) {
      updatedData.completed_at =
        new Date().toISOString()
    }

    // Task moved out of Done
    if (
      task?.status === "done" &&
      updates.status &&
      updates.status !== "done"
    ) {
      updatedData.completed_at = null
    }

    await updateTask(id, updatedData)

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updatedData }
          : t
      )
    )
  }

  // DELETE
  const removeTask = async (id) => {
    await deleteTask(id)
    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    )
  }

  return {
    tasks,
    loading,
    addTask,
    editTask,
    removeTask,
  }
}