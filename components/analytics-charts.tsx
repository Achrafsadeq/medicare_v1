"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalyticsData } from "@/lib/types"
import { mockAnalyticsData } from "@/lib/mock-data"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function AnalyticsCharts() {
  const [data, setData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    // Use mock data directly instead of API call
    setData(mockAnalyticsData)
  }, [])

  if (!data) {
    return <div className="text-center text-muted-foreground">Loading analytics data...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Patients by Age Group</CardTitle>
          <CardDescription>Distribution of patients by age range</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.patientsByAge}>
              <XAxis dataKey="ageRange" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointments by Type</CardTitle>
          <CardDescription>Distribution of appointment types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.appointmentsByType}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Treatment Success Rates</CardTitle>
          <CardDescription>Success rates by condition (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.treatmentSuccess}>
              <XAxis dataKey="condition" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="successRate" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue trends by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenueByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

