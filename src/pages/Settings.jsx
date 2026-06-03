import { useState } from "react"
import { supabase } from "../services/supabase"
import { useAuth } from "../hooks/useAuth.js"
import { useEffect } from "react"
import DangerZone from "../components/settingsPages/DangerZone"

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
      <div className="text-slate-400">
        Loading settings...
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      {/* Profile Section */}
      <ProfileSection
        user={user}
        name={name}
        setName={setName}
      />

      {/* Preferences */}
      <Preferences />

      {/* Danger Zone */}
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

  const updateProfile = async () => {
    setSaving(true)

    const { error } =
      await supabase.auth.updateUser({
        data: {
          name,
        },
      })

    if (error) {
      toast.error("Failed to update profile")
    } else {
      toast.success("Profile updated")
    }

    setSaving(false)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Profile
      </h2>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-slate-300">
            {user?.email}
          </p>

          <p className="text-slate-500 text-sm">
            User Account
          </p>
        </div>
      </div>

      {/* Name input */}
      <div>
        <label className="text-sm text-slate-400">
          Display Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full mt-2 p-3 rounded bg-slate-800 border border-slate-700"
          placeholder="Enter your name"
        />
      </div>

      <button
        onClick={updateProfile}
        disabled={saving}
        className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )
}

function Preferences() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Preferences
      </h2>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-slate-300">
          Dark Mode
        </span>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1 rounded ${
            darkMode
              ? "bg-blue-600"
              : "bg-slate-700"
          }`}
        >
          {darkMode ? "On" : "Off"}
        </button>
      </div>

      <p className="text-slate-500 text-sm">
        More preferences coming soon.
      </p>
    </div>
  )
}

