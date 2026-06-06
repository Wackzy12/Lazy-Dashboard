import {
  LayoutDashboard,
  Paintbrush,
  Timer,
  Settings,
  LogOut,
} from "lucide-react"

import { supabase } from "../../services/supabase"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/lazyDashboard_logo.png"

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      <div className="p-6 border-b border-slate-800 flex justify-around items-center h-24">
        <img
          src={logo}
          alt="Lazy Dashboard"
          className="h-25"
        />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          to="/"
        />

        <SidebarItem
          icon={<Paintbrush size={18} />}
          label="Customization"
          to="/customization"
        />

        <SidebarItem
          icon={<Timer size={18} />}
          label="Pomodoro"
          to="/pomodoro"
        />

        <SidebarItem
          icon={<Settings size={18} />}
          label="Profile Settings"
          to="/settings"
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


function SidebarItem({
  icon,
  label,
  to,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 p-3 rounded-lg transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}