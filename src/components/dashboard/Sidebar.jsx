import {
  LayoutDashboard,
  KanbanSquare,
  Timer,
  Settings,
  LogOut,
} from "lucide-react"

import { supabase } from "../../services/supabase"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400">
          TaskFlow
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        <SidebarItem
          icon={<KanbanSquare size={18} />}
          label="Tasks"
        />

        <SidebarItem
          icon={<Timer size={18} />}
          label="Pomodoro"
        />

        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings"
        />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

function SidebarItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
      {icon}
      {label}
    </button>
  )
}