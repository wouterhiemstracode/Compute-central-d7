"use client"

import { getTotalValueCreated, formatCurrency, getTotalCreditsMatched } from "@/lib/data"
import { Sparkles } from "lucide-react"

export function RecoveredValueBanner() {
  const totalValueCreated = getTotalValueCreated()
  const totalMatched = getTotalCreditsMatched()

  return (
    <div className="rounded-lg bg-success/10 border border-success/30 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-success/20 p-2">
          <Sparkles className="h-5 w-5 text-success" />
        </div>
        <div>
          <p className="font-semibold text-success text-lg">
            {formatCurrency(totalValueCreated)} in value created through credit matching
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {formatCurrency(totalMatched)} in credits successfully matched from suppliers to buyers, 
            saving credits that would have otherwise expired.
          </p>
        </div>
      </div>
    </div>
  )
}
