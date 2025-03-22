"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Dashboard context for sharing state between dashboard components
interface DashboardContextType {
  // Dashboard-wide state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Filters and search
  searchQuery: string
  setSearchQuery: (query: string) => void
  dateRange: [Date | null, Date | null]
  setDateRange: (range: [Date | null, Date | null]) => void

  // Refresh data
  refreshData: () => void

  // Dashboard layout preferences
  compactView: boolean
  setCompactView: (compact: boolean) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Dashboard state
  const [isLoading, setIsLoading] = useState(false)

  // Filters and search
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])

  // Dashboard layout preferences
  const [compactView, setCompactView] = useState(false)

  // Refresh data function
  const refreshData = () => {
    setIsLoading(true)
    // In a real app, this would fetch fresh data
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <DashboardContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchQuery,
        setSearchQuery,
        dateRange,
        setDateRange,
        refreshData,
        compactView,
        setCompactView,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

