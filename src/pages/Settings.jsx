import { useState } from "react"
import { supabase } from "../services/supabase"
import { useAuth } from "../hooks/useAuth.js"
import { useEffect } from "react"
import DangerZone from "../components/settingsPages/DangerZone"
import { useTheme } from "../features/theme/ThemeContext"
import { toast } from "sonner"

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        setName(user.user_metadata?.name || "")
      }

      setLoading(false)
    }

    getUser()
  }, [])

  if (loading) {
    return (
      <div className="text-slate-500 dark:text-slate-400">
        Loading settings...
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">
        Profile Settings
      </h1>

      <ProfileSection
        user={user}
        name={name}
        setName={setName}
      />

      <PasswordSection />

      <DangerZone />
    </div>
  )
}

function ProfileSection({
  user,
  name,
  setName,
}) {
  const [saving, setSaving] = useState(false)

  const { theme } = useTheme()
  const isDark = theme === "dark"

  const updateProfile = async () => {
    try {
      setSaving(true)

      const { error } =
        await supabase.auth.updateUser({
          data: {
            name,
          },
        })

      if (error) {
        toast.error("Failed to update profile")
        return
      }

      toast.success("Profile updated")
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className={`
        rounded-xl p-6 space-y-4 border transition-colors
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <h2
        className={`text-xl font-semibold ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        Profile
      </h2>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p
            className={
              isDark
                ? "text-slate-300"
                : "text-slate-800"
            }
          >
            {user?.email}
          </p>

          <p
            className={
              isDark
                ? "text-slate-500 text-sm"
                : "text-slate-500 text-sm"
            }
          >
            User Account
          </p>
        </div>
      </div>

      <div>
        <label
          className={
            isDark
              ? "text-sm text-slate-400"
              : "text-sm text-slate-600"
          }
        >
          Display Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter your name"
          className={`
            w-full mt-2 p-3 rounded-lg border transition-colors
            ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }
          `}
        />
      </div>

      <button
        onClick={updateProfile}
        disabled={saving}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
          disabled:opacity-50
        "
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )
}

function PasswordSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [password, setPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [saving, setSaving] =
    useState(false)

  const updatePassword = async () => {
    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      )
      return
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      )
      return
    }

    setSaving(true)

    const { error } =
      await supabase.auth.updateUser({
        password,
      })

    if (error) {
      toast.error(
        "Failed to update password"
      )
    } else {
      toast.success(
        "Password updated successfully"
      )

      setPassword("")
      setConfirmPassword("")
    }

    setSaving(false)
  }

  return (
    <div
      className={`
        rounded-xl p-6 space-y-4 border
        ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }
      `}
    >
      <h2
        className={`text-xl font-semibold ${
          isDark
            ? "text-white"
            : "text-slate-900"
        }`}
      >
        Change Password
      </h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className={`
          w-full p-3 rounded-lg border
          ${
            isDark
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-slate-200 text-slate-900"
          }
        `}
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
        className={`
          w-full p-3 rounded-lg border
          ${
            isDark
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-slate-200 text-slate-900"
          }
        `}
      />

      <button
        onClick={updatePassword}
        disabled={saving}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        {saving
          ? "Updating..."
          : "Update Password"}
      </button>
    </div>
  )
}

