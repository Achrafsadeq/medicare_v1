import { AnalyticsCharts } from "@/components/analytics-charts"

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-white">Analytics</h1>
      <p className="text-muted-foreground">View and analyze patient and operational data.</p>

      <AnalyticsCharts />
    </div>
  )
}

