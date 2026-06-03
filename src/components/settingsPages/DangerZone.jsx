import { useState } from "react"
import { supabase } from "../../services/supabase"
import { toast } from "sonner"

export default function DangerZone() {
  const [loading, setLoading] = useState(false)

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account and all tasks."
    )

    if (!confirmDelete) return

    setLoading(true)

    try {
      // 1. Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("No user found")

      const userId = user.id

      // 2. Delete user tasks first (IMPORTANT)
      const { error: taskError } = await supabase
        .from("tasks")
        .delete()
        .eq("user_id", userId)

      if (taskError) throw taskError

      // 3. Delete auth user
      const { error: authError } =
        await supabase.auth.admin.deleteUser(
          userId
        )

      if (authError) throw authError

      toast.success("Account deleted successfully")

      // 4. Force logout
      await supabase.auth.signOut()

      // 5. Redirect to login
      window.location.href = "/login"
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-red-950/20 border border-red-900 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-red-400">
        Danger Zone
      </h2>

      <p className="text-slate-400 text-sm">
        These actions are irreversible.
      </p>

      <button
        onClick={deleteAccount}
        disabled={loading}
        className="bg-red-600 px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  )
}