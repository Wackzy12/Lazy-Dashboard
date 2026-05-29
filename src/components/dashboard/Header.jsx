import { Bell } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="h-20 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-950">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-slate-400 text-sm">
          Stay productive today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-slate-800 transition">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            {user?.email?.[0]?.toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}