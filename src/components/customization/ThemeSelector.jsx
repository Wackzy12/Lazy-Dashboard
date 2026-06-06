import { Moon, Sun } from "lucide-react"

export default function ThemeSelector() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Theme
      </h2>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600">
          <Moon size={18} />
          Dark
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800">
          <Sun size={18} />
          Light
        </button>
      </div>
    </div>
  )
}