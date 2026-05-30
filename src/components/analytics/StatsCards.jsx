export default function StatsCards({
  stats,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card
        title="Total Tasks"
        value={stats.total}
      />

      <Card
        title="Completed"
        value={stats.completed}
      />

      <Card
        title="In Progress"
        value={stats.inProgress}
      />

      <Card
        title="Productivity"
        value={`${stats.productivity}%`}
      />
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
      <p className="text-slate-400 text-sm">
        {title}
      </p>
      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </div>
  )
}