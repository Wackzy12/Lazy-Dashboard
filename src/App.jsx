import { useEffect } from 'react'
import { supabase } from './services/supabase'

function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } =
        await supabase.auth.getSession()

      console.log(data)
      console.log(error)
    }

    testConnection()
  }, [])

  return (
    <div className="p-10 text-white">
      Supabase Connected
    </div>
  )
}

export default App