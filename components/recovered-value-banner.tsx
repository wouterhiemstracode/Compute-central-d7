"use client"

import { getTotalCreditsRecovered, formatCurrency } from "@/lib/data"
import { Sparkles } from "lucide-react"

export function RecoveredValueBanner() {
  const totalRecovered = getTotalCreditsRecovered()

  return (
    <div className="rounded-lg bg-success/10 border border-success/30 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-success/20 p-2">
          <Sparkles className="h-5 w-5 text-success" />
        </div>
        <div>
          <p className="font-semibold text-success text-lg">
            {formatCurrency(totalRecovered)} in compute credits recovered
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Recovered credits = credits used or allocated before expiry that would have otherwise been lost.
          </p>
        </div>
      </div>
    </div>
  )
}
