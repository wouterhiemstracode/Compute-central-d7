"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { calculateOptimizationSuggestions, formatCurrency, getTotalAtRisk } from "@/lib/data"
import { AlertTriangle } from "lucide-react"

export function OptimizationAlert() {
  const suggestions = calculateOptimizationSuggestions()

  if (suggestions.length === 0) {
    return null
  }

  const totalAtRisk = getTotalAtRisk()
  const topRisk = suggestions[0]

  return (
    <Alert className="border-warning bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertTitle className="text-foreground font-semibold">
        Value at Risk
      </AlertTitle>
      <AlertDescription className="text-foreground">
        <p className="mt-1">
          You are projected to lose{" "}
          <span className="font-bold text-warning">{formatCurrency(totalAtRisk)}</span> in
          credits over the next 3 months based on current usage.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Most risk comes from {topRisk.provider.toUpperCase()} credits expiring soon.
          Consider increasing allocation or finding recovery opportunities.
        </p>
      </AlertDescription>
    </Alert>
  )
}
