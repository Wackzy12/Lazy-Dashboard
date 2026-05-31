export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800">
      <div className="p-6">
        <h1 className="font-bold text-xl">
          TaskFlow
        </h1>
      </div>

      <nav className="space-y-2 px-4">
        <button className="w-full text-left">
          Dashboard
        </button>

        <button className="w-full text-left">
          Pomodoro
        </button>

        <button className="w-full text-left">
          Settings
        </button>
      </nav>
    </aside>
  )
}