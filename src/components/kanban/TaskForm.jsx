import { useState } from "react"

export default function TaskForm({
  initialValues,
  onSubmit,
}) {
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
      due_date: dueDate,
    })
  }

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
        className="w-full p-3 rounded bg-slate-800"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        className="w-full p-3 rounded bg-slate-800"
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        className="w-full p-3 rounded bg-slate-800"
      />

      <button
        className="w-full bg-blue-600 p-3 rounded"
      >
        Save Task
      </button>
    </form>
  )
}