import { useTheme } from "../../features/theme/ThemeContext"
import Sidebar from "../../components/dashboard/Sidebar"
import Header from "../../components/dashboard/Header"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  const { theme } = useTheme()

  const isDark = theme === "dark"

  return (
    <div
      className={`min-h-screen flex ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}