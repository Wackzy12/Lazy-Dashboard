import { useEffect, useState } from "react"

export function usePreferences() {
  const [preferences, setPreferences] =
    useState({
      animations: true,
      autoSort: false,
    })

  useEffect(() => {
    const saved =
      localStorage.getItem("preferences")

    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  return preferences
}