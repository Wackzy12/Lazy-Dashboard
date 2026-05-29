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
    })

    setTasks((prev) => [data[0], ...prev])
  }

  // UPDATE
  const editTask = async (id, updates) => {
    await updateTask(id, updates)

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates } : t
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