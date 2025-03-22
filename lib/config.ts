// Central configuration for the application
// Provides type-safe configuration options for theming, layout, and features

export type ThemeMode = "light" | "dark" | "system"

export interface Config {
  theme: {
    mode: ThemeMode
    colors: {
      primary: string
      secondary: string
      accent: string
    }
    radius: number
  }
  layout: {
    sidebar: {
      width: number
      collapsedWidth: number
      defaultCollapsed: boolean
    }
    header: {
      height: number
    }
  }
  features: {
    notifications: boolean
    themeToggle: boolean
    compactMode: boolean
  }
}

// Default configuration
export const defaultConfig: Config = {
  theme: {
    mode: "dark",
    colors: {
      primary: "#74c69d", // Medium green
      secondary: "#1e293b", // slate-800
      accent: "#95d5b2", // Light green
    },
    radius: 8,
  },
  layout: {
    sidebar: {
      width: 256,
      collapsedWidth: 64,
      defaultCollapsed: false,
    },
    header: {
      height: 64,
    },
  },
  features: {
    notifications: true,
    themeToggle: true,
    compactMode: false,
  },
}

