import { useState } from "react"
import { useTheme } from "../../features/theme/ThemeContext"

export default function TaskForm({
  initialValues,
  onSubmit,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [title, setTitle] =
    useState(initialValues?.title || "")

  const [description, setDescription] =
    useState(initialValues?.description || "")

  const [priority, setPriority] =
    useState(initialValues?.priority || "medium")

  const [dueDate, setDueDate] =
    useState(initialValues?.due_date || "")

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      title,
      description,
      priority,
      due_date: dueDate || null,
    })
  }

  const inputStyles = isDark
    ? "w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
    : "w-full p-3 rounded-lg bg-white border border-slate-200 text-slate-900"

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        required
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Task title"
        className={inputStyles}
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        className={inputStyles}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className={inputStyles}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <input
        required
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        className={inputStyles}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
      >
        Save Task
      </button>
    </form>
  )
}