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
import { useTheme } from "../../features/theme/ThemeContext"


export default function Sidebar() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const navigate = useNavigate()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <aside
      className={`
        w-64 hidden md:flex flex-col border-r transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }
      `}
    >
      <div
        className={`
          p-6 h-24 flex justify-center items-center border-b
          ${
            isDark
              ? "border-slate-800"
              : "border-slate-200"
          }
        `}
      >
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
          isDark={isDark}
        />

        <SidebarItem
          icon={<Paintbrush size={18} />}
          label="Customization"
          to="/customization"
          isDark={isDark}
        />

        <SidebarItem
          icon={<Timer size={18} />}
          label="Pomodoro"
          to="/pomodoro"
          isDark={isDark}
        />

        <SidebarItem
          icon={<Settings size={18} />}
          label="Profile Settings"
          to="/settings"
          isDark={isDark}
        />
      </nav>

      <div
        className={`
          p-4 border-t
          ${
            isDark
              ? "border-slate-800"
              : "border-slate-200"
          }
        `}
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
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
  isDark,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 p-3 rounded-lg transition ${
          isActive
            ? "bg-blue-600 text-white"
            : isDark
            ? "text-slate-300 hover:bg-slate-800 hover:text-white"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}