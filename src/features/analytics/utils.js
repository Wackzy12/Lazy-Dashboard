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

  const productivity =
    total === 0
      ? 0
      : Math.round((completed / total) * 100)

  return {
    total,
    completed,
    inProgress,
    todo,
    productivity,
  }
}