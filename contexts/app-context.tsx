"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Config, defaultConfig, type ThemeMode } from "@/lib/config"

interface AppContextType {
  config: Config
  updateConfig: (config: Partial<Config>) => void
  setThemeMode: (mode: ThemeMode) => void
  toggleSidebar: () => void
  isSidebarCollapsed: boolean
  toggleCompactMode: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Config>(defaultConfig)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(defaultConfig.layout.sidebar.defaultCollapsed)

  // Initialize from localStorage
  useEffect(() => {
    // Theme mode
    const savedThemeMode = localStorage.getItem("theme-mode") as ThemeMode | null
    if (savedThemeMode) {
      setThemeMode(savedThemeMode)
    } else {
      setThemeMode(config.theme.mode)
    }

    // Sidebar state
    const savedSidebarState = localStorage.getItem("sidebar-collapsed")
    if (savedSidebarState !== null) {
      setIsSidebarCollapsed(savedSidebarState === "true")
    }

    // Compact mode
    const savedCompactMode = localStorage.getItem("compact-mode")
    if (savedCompactMode !== null) {
      updateConfig({
        features: {
          ...config.features,
          compactMode: savedCompactMode === "true",
        },
      })
    }
  }, [])

  // Update config
  const updateConfig = (newConfig: Partial<Config>) => {
    setConfig((prev) => {
      const updated = {
        ...prev,
        ...newConfig,
        theme: { ...prev.theme, ...(newConfig.theme || {}) },
        layout: { ...prev.layout, ...(newConfig.layout || {}) },
        features: { ...prev.features, ...(newConfig.features || {}) },
      }
      return updated
    })
  }

  // Set theme mode
  const setThemeMode = (mode: ThemeMode) => {
    updateConfig({ theme: { ...config.theme, mode } })
    localStorage.setItem("theme-mode", mode)

    if (mode === "dark") {
      document.documentElement.classList.add("dark")
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark")
    } else if (mode === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      systemPrefersDark
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark")
    }
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed
    setIsSidebarCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  // Toggle compact mode
  const toggleCompactMode = () => {
    const newState = !config.features.compactMode
    updateConfig({
      features: {
        ...config.features,
        compactMode: newState,
      },
    })
    localStorage.setItem("compact-mode", String(newState))
  }

  return (
    <AppContext.Provider
      value={{
        config,
        updateConfig,
        setThemeMode,
        toggleSidebar,
        isSidebarCollapsed,
        toggleCompactMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

