// Theme configuration for the application
// This allows for easy customization of colors and other theme properties

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}

export interface ThemeConfig {
  mode: ThemeMode
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  borderRadius: string
  fontSizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    "2xl": string
    "3xl": string
  }
}

// Default theme configuration
export const defaultThemeConfig: ThemeConfig = {
  mode: "dark",
  colors: {
    light: {
      primary: "hsl(196, 100%, 47%)",
      secondary: "hsl(240, 4.8%, 95.9%)",
      accent: "hsl(240, 4.8%, 95.9%)",
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(240, 10%, 3.9%)",
      muted: "hsl(240, 4.8%, 95.9%)",
      border: "hsl(240, 5.9%, 90%)",
    },
    dark: {
      primary: "hsl(196, 100%, 47%)",
      secondary: "hsl(240, 3.7%, 15.9%)",
      accent: "hsl(240, 3.7%, 15.9%)",
      background: "hsl(240, 10%, 3.9%)",
      foreground: "hsl(0, 0%, 98%)",
      muted: "hsl(240, 3.7%, 15.9%)",
      border: "hsl(240, 3.7%, 15.9%)",
    },
  },
  borderRadius: "0.5rem",
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  },
}

