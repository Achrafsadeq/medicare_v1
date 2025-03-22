// Layout configuration for the application
// This allows for easy customization of layout properties

export interface LayoutConfig {
  sidebar: {
    width: string
    collapsedWidth: string
    mobileWidth: string
    collapsible: boolean
    defaultCollapsed: boolean
  }
  header: {
    height: string
    sticky: boolean
  }
  content: {
    maxWidth: string
    padding: {
      mobile: string
      tablet: string
      desktop: string
    }
  }
  breakpoints: {
    mobile: string
    tablet: string
    desktop: string
    wide: string
  }
}

// Default layout configuration
export const defaultLayoutConfig: LayoutConfig = {
  sidebar: {
    width: "16rem",
    collapsedWidth: "4rem",
    mobileWidth: "18rem",
    collapsible: true,
    defaultCollapsed: false,
  },
  header: {
    height: "4rem",
    sticky: true,
  },
  content: {
    maxWidth: "1400px",
    padding: {
      mobile: "1rem",
      tablet: "1.5rem",
      desktop: "2rem",
    },
  },
  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },
}

