import Preferences from "../components/customization/Preferences"
import ThemeSelector from "../components/customization/ThemeSelector"
import AccentColorSelector from "../components/customization/AccentColorSelector"

export default function Customization() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customization
        </h1>

        <p className="text-slate-400 mt-2">
          Personalize your dashboard experience.
        </p>
      </div>

      <ThemeSelector />

      <AccentColorSelector />

      <Preferences />
    </div>
  )
}