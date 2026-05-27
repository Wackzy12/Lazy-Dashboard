import { useState } from "react"
import { supabase } from "../services/supabase"
import { useNavigate, Link } from "react-router-dom"
import { toast, Toaster } from "sonner"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    toast.success("Login successful!")
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate("/")
  }

  return (
    <div className="bg-slate-900 p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-1">
        Welcome back
      </h1>

      <p className="text-slate-400 mb-6">
        Login to your dashboard
      </p>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-slate-800 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-medium"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-slate-400 mt-4">
        No account?{" "}
        <Link className="text-blue-400" to="/register">
          Register
        </Link>
      </p>
    </div>
  )
}