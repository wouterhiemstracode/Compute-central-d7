"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { calculateOptimizationSuggestions, formatCurrency } from "@/lib/data"
import { AlertTriangle, Lightbulb } from "lucide-react"

export function OptimizationAlert() {
  const suggestions = calculateOptimizationSuggestions()

  if (suggestions.length === 0) {
    return null
  }

  const totalAtRisk = suggestions.reduce((sum, s) => sum + s.atRisk, 0)
  const topRisk = suggestions[0]

  return (
    <Alert className="border-warning bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertTitle className="text-warning flex items-center gap-2">
        <Lightbulb className="h-4 w-4" />
        Optimization Suggestion
      </AlertTitle>
      <AlertDescription className="text-warning-foreground">
        <p className="mt-1">
          You are likely to lose{" "}
          <span className="font-bold">{formatCurrency(totalAtRisk)}</span> in
          credits over the next {topRisk.months} months based on your current
          burn rate.
        </p>
        <p className="mt-2 text-sm opacity-90">
          Consider increasing usage of {topRisk.provider.toUpperCase()} credits
          or explore marketplace vendors to maximize value before expiration.
        </p>
      </AlertDescription>
    </Alert>
  )
}
