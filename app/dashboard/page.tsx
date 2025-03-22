"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardContainer } from "@/components/ui/dashboard-container"
import { RefreshCw, LayoutGrid, LayoutList } from "lucide-react"
import { useApp } from "@/contexts/app-context"

// Mock data for demonstration
const todaysAppointments = [
  { id: "1", patientName: "John Smith", time: "09:00", type: "Check-up", doctorName: "Dr. Elizabeth Taylor" },
  { id: "2", patientName: "Emily Johnson", time: "10:30", type: "Follow-up", doctorName: "Dr. Robert Brown" },
  { id: "3", patientName: "Michael Chen", time: "13:15", type: "Consultation", doctorName: "Dr. Jennifer Wilson" },
]

const recentActivities = [
  {
    id: "1",
    title: "New Patient Registration",
    description: "Maria Garcia was registered as a new patient",
    time: "10 minutes ago",
    icon: "user",
  },
  {
    id: "2",
    title: "Lab Results Available",
    description: "Blood work results for John Smith are ready for review",
    time: "45 minutes ago",
    icon: "lab",
  },
  {
    id: "3",
    title: "Appointment Rescheduled",
    description: "Emily Johnson rescheduled her appointment to next week",
    time: "2 hours ago",
    icon: "calendar",
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { config, toggleCompactMode } = useApp()

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <DashboardContainer
      title="Dashboard"
      description="Overview of your medical practice"
      isLoading={isLoading}
      actions={
        <>
          <Button variant="outline" size="sm" onClick={toggleCompactMode}>
            {config.features.compactMode ? (
              <LayoutGrid className="h-4 w-4 mr-2" />
            ) : (
              <LayoutList className="h-4 w-4 mr-2" />
            )}
            {config.features.compactMode ? "Grid View" : "Compact View"}
          </Button>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <StatsCard title="Patients" value="1,248" description="Total patients" />
        <StatsCard title="Appointments" value="24" description="Today's schedule" />
        <StatsCard title="Lab Results" value="7" description="Pending review" />
        <StatsCard title="Treatments" value="42" description="Active plans" />
        <StatsCard title="New Patients" value="15" description="This month" />
        <StatsCard title="Upcoming" value="87" description="Next 7 days" />
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>Upcoming scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {todaysAppointments.length > 0 ? (
              <div className="space-y-4">
                {todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm md:text-base">{appointment.patientName}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {appointment.time} - {appointment.type}
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full border border-zinc-800 px-2 py-0.5 text-xs font-semibold">
                        {appointment.doctorName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No appointments scheduled for today.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 border-b border-zinc-800 pb-4 last:border-0">
                  <div className="rounded-full bg-green-700/20 p-2 shrink-0">
                    <ActivityIcon type={activity.icon} />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base">{activity.title}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  )
}

// Helper components
function StatsCard({ title, value, description }: { title: string; value: string; description: string }) {
  const { config } = useApp()
  const isCompact = config.features.compactMode

  return (
    <Card>
      <CardHeader className={isCompact ? "p-3" : "pb-2"}>
        <CardTitle className={isCompact ? "text-xs" : "text-sm"}>{title}</CardTitle>
        {!isCompact && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className={isCompact ? "p-3 pt-0" : undefined}>
        <p className={isCompact ? "text-lg font-bold" : "text-xl md:text-3xl font-bold"}>{value}</p>
      </CardContent>
    </Card>
  )
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-green-700"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case "lab":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-green-700"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    case "calendar":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-green-700"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      )
    default:
      return null
  }
}

