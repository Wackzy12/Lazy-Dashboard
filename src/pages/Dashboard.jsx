export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-slate-400 mt-1">
          Here's your productivity overview.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Completed Tasks"
          value="24"
        />

        <StatsCard
          title="Pending Tasks"
          value="8"
        />

        <StatsCard
          title="Productivity"
          value="87%"
        />

        <StatsCard
          title="Due Today"
          value="3"
        />
      </section>

      <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">
          Kanban Board
        </h2>

        <div className="h-96 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
          Kanban Board Coming Soon
        </div>
      </section>
    </div>
  )
}

function StatsCard({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  )
}