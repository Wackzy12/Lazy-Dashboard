export function getTaskStats(tasks) {
  const total = tasks.length

  const completed = tasks.filter(
    t => t.status === "done"
  ).length

  const inProgress = tasks.filter(
    t => t.status === "in_progress"
  ).length

  const todo = tasks.filter(
    t => t.status === "todo"
  ).length

  const overdue = tasks.filter(task => {
    if (!task.due_date) return false

    return (
      new Date(task.due_date) < new Date() &&
      task.status !== "done"
    )
  }).length

  const productivity =
    total === 0
      ? 0
      : Math.round((completed / total) * 100)

  return {
    total,
    completed,
    inProgress,
    todo,
    overdue,
    productivity,
    averageCompletionTime: getAverageCompletionTime(tasks),
  }
}

export function getAverageCompletionTime(tasks) {
  const completedTasks = tasks.filter(
    task =>
      task.completed_at &&
      task.created_at
  )

  if (completedTasks.length === 0) {
    return 0
  }

  const totalDays = completedTasks.reduce(
    (sum, task) => {
      const created =
        new Date(task.created_at)

      const completed =
        new Date(task.completed_at)

      const diffDays =
        (completed - created) /
        (1000 * 60 * 60 * 24)

      return sum + diffDays
    },
    0
  )

  return (
    totalDays /
    completedTasks.length
  ).toFixed(1)
}