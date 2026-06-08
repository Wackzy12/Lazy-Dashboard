import { useState } from "react"
import { supabase } from "../../services/supabase"
import { toast } from "sonner"
import { useTheme } from "../../features/theme/ThemeContext"

export default function DangerZone() {
  const [loading, setLoading] = useState(false)

  const { theme } = useTheme()
  const isDark = theme === "dark"

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account and all tasks."
    )

    if (!confirmDelete) return

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("No user found")

      const userId = user.id

      const { error: taskError } = await supabase
        .from("tasks")
        .delete()
        .eq("user_id", userId)

      if (taskError) throw taskError

      const { error: authError } =
        await supabase.auth.admin.deleteUser(userId)

      if (authError) throw authError

      toast.success("Account deleted successfully")

      await supabase.auth.signOut()

      window.location.href = "/login"
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`
        rounded-xl p-6 space-y-4 border transition-colors
        ${
          isDark
            ? "bg-red-950/20 border-red-900"
            : "bg-red-50 border-red-200"
        }
      `}
    >
      <h2
        className={`
          text-xl font-semibold
          ${
            isDark
              ? "text-red-400"
              : "text-red-600"
          }
        `}
      >
        Danger Zone
      </h2>

      <p
        className={
          isDark
            ? "text-slate-400 text-sm"
            : "text-slate-600 text-sm"
        }
      >
        These actions are irreversible.
      </p>

      <button
        onClick={deleteAccount}
        disabled={loading}
        className="
          bg-red-600
          hover:bg-red-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
          disabled:opacity-50
        "
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  )
}