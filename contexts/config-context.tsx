"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type ThemeConfig, defaultThemeConfig, type ThemeMode } from "@/lib/theme-config"
import { type LayoutConfig, defaultLayoutConfig } from "@/lib/layout-config"

interface ConfigContextType {
  theme: ThemeConfig
  layout: LayoutConfig
  setThemeMode: (mode: ThemeMode) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  isSidebarCollapsed: boolean
  updateThemeConfig: (config: Partial<ThemeConfig>) => void
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultThemeConfig)
  const [layout, setLayout] = useState<LayoutConfig>(defaultLayoutConfig)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(defaultLayoutConfig.sidebar.defaultCollapsed)

  // Set theme mode
  const setThemeMode = (mode: ThemeMode) => {
    setTheme((prev) => ({ ...prev, mode }))

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

  // Set sidebar collapsed state
  const setSidebarCollapsed = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed)
    // Save to localStorage
    localStorage.setItem("sidebar-collapsed", String(collapsed))
  }

  // Update theme config
  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...config }))
  }

  // Update layout config
  const updateLayoutConfig = (config: Partial<LayoutConfig>) => {
    setLayout((prev) => ({ ...prev, ...config }))
  }

  // Initialize from localStorage
  useEffect(() => {
    // Theme mode
    const savedThemeMode = localStorage.getItem("theme-mode") as ThemeMode | null
    if (savedThemeMode) {
      setThemeMode(savedThemeMode)
    } else {
      setThemeMode(theme.mode)
    }

    // Sidebar collapsed state
    const savedSidebarCollapsed = localStorage.getItem("sidebar-collapsed")
    if (savedSidebarCollapsed !== null) {
      setIsSidebarCollapsed(savedSidebarCollapsed === "true")
    }
  }, [])

  return (
    <ConfigContext.Provider
      value={{
        theme,
        layout,
        setThemeMode,
        setSidebarCollapsed,
        isSidebarCollapsed,
        updateThemeConfig,
        updateLayoutConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }
  return context
}

