export default function AppLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64
          bg-slate-900 z-50
          transition-transform duration-300
          md:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />

        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="absolute top-4 right-4"
        >
          ✕
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <div className="flex-1">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-slate-800">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            ☰
          </button>

          <h1 className="font-bold">
            TaskFlow
          </h1>
        </div>

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}