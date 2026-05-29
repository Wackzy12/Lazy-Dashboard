import Sidebar from "../../components/dashboard/Sidebar"
import Header from "../../components/dashboard/Header"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
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