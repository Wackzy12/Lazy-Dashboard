import { useTheme } from "../features/theme/ThemeContext"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ThemeSelector from "../components/customization/ThemeSelector"
import Preferences from "../components/customization/Preferences"

export default function Customization() {
  const [settings, setSettings] = useState({
    compactMode: false,
    animations: true,
    autoSort: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem("preferences")

    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const { theme, setTheme } = useTheme()
  
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const saveSettings = () => {
    localStorage.setItem(
      "preferences",
      JSON.stringify(settings)
    )

    toast.success("Preferences saved")
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">
        Customization 
      </h1>

      <ThemeSelector
        theme={theme}
        setTheme={setTheme}
      />

      <Preferences
        settings={settings}
        toggleSetting={toggleSetting}
        saveSettings={saveSettings}
      />
    </div>
  )
}