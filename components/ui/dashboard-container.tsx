import type React from "react"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/app-context"
import { Loader2 } from "lucide-react"

interface DashboardContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  actions?: React.ReactNode
  isLoading?: boolean
}

export function DashboardContainer({
  children,
  className,
  title,
  description,
  actions,
  isLoading = false,
}: DashboardContainerProps) {
  const { config } = useApp()
  const isCompact = config.features.compactMode

  return (
    <div className={cn("grid gap-4 md:gap-6", isCompact ? "space-y-2" : "space-y-4", className)}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

