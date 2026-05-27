import { useState } from "react"
import { supabase } from "../services/supabase"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate("/login")
  }

  return (
    <div className="bg-slate-900 p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-1">
        Create account
      </h1>

      <p className="text-slate-400 mb-6">
        Start organizing your tasks
      </p>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
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
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-slate-400 mt-4">
        Already have an account?{" "}
        <Link className="text-blue-400" to="/login">
          Login
        </Link>
      </p>
    </div>
  )
}