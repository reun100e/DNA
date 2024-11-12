import { useTheme } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"

export function LightDarkToggle() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark")

  useEffect(() => {
    setIsDarkMode(theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setTheme(newTheme)
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
      <Sun className={`h-5 w-5 ${isDarkMode ? "hidden" : ""}`} />
      <Moon className={`h-5 w-5 ${!isDarkMode ? "hidden" : ""}`} />
    </div>
  )
}
