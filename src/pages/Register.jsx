function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Create Account
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg p-3"
          />

          <button className="w-full rounded-lg bg-blue-500 p-3">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register