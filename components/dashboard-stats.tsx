"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardStats as DashboardStatsType } from "@/lib/types"
import { mockDashboardStats } from "@/lib/mock-data"
import { useDashboard } from "@/contexts/dashboard-context"
import { cn } from "@/lib/utils"

interface DashboardStatsProps {
  className?: string
  showTitle?: boolean
}

export function DashboardStats({ className, showTitle = false }: DashboardStatsProps) {
  const [stats, setStats] = useState<DashboardStatsType | null>(null)
  const { compactView } = useDashboard()

  useEffect(() => {
    // Use mock data directly instead of API call
    setStats(mockDashboardStats)
  }, [])

  if (!stats) {
    return <div className="text-center text-muted-foreground">Loading dashboard statistics...</div>
  }

  return (
    <div
      className={cn(
        "grid gap-4 md:gap-6",
        compactView ? "grid-cols-3 md:grid-cols-6" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      <Card>
        <CardHeader className={cn("pb-2", compactView && "p-3")}>
          <CardTitle className={cn("text-sm", compactView && "text-xs")}>{showTitle && "Total "}Patients</CardTitle>
          {!compactView && <CardDescription className="text-xs">Current active patients</CardDescription>}
        </CardHeader>
        <CardContent className={compactView ? "p-3 pt-0" : undefined}>
          <p className={cn("font-bold", compactView ? "text-lg" : "text-xl md:text-3xl")}>
            {stats.totalPatients.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={cn("pb-2", compactView && "p-3")}>
          <CardTitle className={cn("text-sm", compactView && "text-xs")}>
            {showTitle && "Today's "}Appointments
          </CardTitle>
          {!compactView && <CardDescription className="text-xs">Scheduled for today</CardDescription>}
        </CardHeader>
        <CardContent className={compactView ? "p-3 pt-0" : undefined}>
          <p className={cn("font-bold", compactView ? "text-lg" : "text-xl md:text-3xl")}>{stats.appointmentsToday}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={cn("pb-2", compactView && "p-3")}>
          <CardTitle className={cn("text-sm", compactView && "text-xs")}>{showTitle && "Pending "}Results</CardTitle>
          {!compactView && <CardDescription className="text-xs">Lab results awaiting review</CardDescription>}
        </CardHeader>
        <CardContent className={compactView ? "p-3 pt-0" : undefined}>
          <p className={cn("font-bold", compactView ? "text-lg" : "text-xl md:text-3xl")}>{stats.pendingLabResults}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={cn("pb-2", compactView && "p-3")}>
          <CardTitle className={cn("text-sm", compactView && "text-xs")}>{showTitle && "Active "}Treatments</CardTitle>
          {!compactView && <CardDescription className="text-xs">Ongoing treatment plans</CardDescription>}
        </CardHeader>
        <CardContent className={compactView ? "p-3 pt-0" : undefined}>
          <p className={cn("font-bold", compactView ? "text-lg" : "text-xl md:text-3xl")}>{stats.activeTreatments}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={cn("pb-2", compactView && "p-3")}>
          <CardTitle className={cn("text-sm", compactView && "text-xs")}>{showTitle && "New "}Registrations</CardTitle>
          {!compactView && <CardDescription className="text-xs">Patients registered this month</CardDescription>}
        </CardHeader>
        <CardContent className={compactView ? "p-3 pt-0" : undefined}>
          <p className={cn("font-bold", compactView ? "text-lg" : "text-xl md:text-3xl")}>
            {stats.recentRegistrations}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className={cn("pb-2", compactView && "p-3")}>
          <CardTitle className={cn("text-sm", compactView && "text-xs")}>
            {showTitle && "Upcoming "}Appointments
          </CardTitle>
          {!compactView && <CardDescription className="text-xs">Scheduled for next 7 days</CardDescription>}
        </CardHeader>
        <CardContent className={compactView ? "p-3 pt-0" : undefined}>
          <p className={cn("font-bold", compactView ? "text-lg" : "text-xl md:text-3xl")}>
            {stats.upcomingAppointments}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

