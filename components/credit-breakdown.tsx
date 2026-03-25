"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  creditBalances,
  formatCurrency,
  formatDate,
  getMonthsUntilExpiry,
  getTotalAtRisk,
  getTotalAvailableForAllocation,
  getTotalCreditsAllocated,
} from "@/lib/data"

export function CreditBreakdown() {
  const totalAtRisk = getTotalAtRisk()
  const totalAllocated = getTotalCreditsAllocated()
  const totalAvailable = getTotalAvailableForAllocation()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Credit Breakdown by Provider</CardTitle>
          <div className="flex gap-6 text-right">
            <div>
              <p className="text-sm text-muted-foreground">Allocated</p>
              <p className="font-bold text-primary">{formatCurrency(totalAllocated)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="font-bold text-success">{formatCurrency(totalAvailable)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">At risk</p>
              <p className="font-bold text-destructive">{formatCurrency(totalAtRisk)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {creditBalances.map((balance) => {
          const monthsLeft = getMonthsUntilExpiry(balance.expirationDate)
          const projectedUsage = balance.monthlyBurn * monthsLeft
          const projectedLoss = Math.max(0, balance.dollarValue - projectedUsage)
          const usedPercent = (balance.usedValue / balance.dollarValue) * 100
          const allocatedPercent = (balance.allocatedValue / balance.dollarValue) * 100
          const availablePercent = (balance.availableForAllocation / balance.dollarValue) * 100

          return (
            <div key={balance.provider} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor:
                        balance.provider === "aws"
                          ? "#FF9900"
                          : balance.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                      color: balance.provider === "aws" ? "#000" : "#fff",
                    }}
                  >
                    {balance.provider.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{balance.name}</p>
                    <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                      Expires {formatDate(balance.expirationDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatCurrency(balance.dollarValue)}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {monthsLeft} months left
                  </p>
                </div>
              </div>

              {/* Stacked progress bar */}
              <div className="space-y-2">
                <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                  <div
                    className="bg-foreground/70 h-full"
                    style={{ width: `${usedPercent}%` }}
                    title="Used internally"
                  />
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${allocatedPercent}%` }}
                    title="Already allocated"
                  />
                  <div
                    className="bg-success h-full"
                    style={{ width: `${availablePercent}%` }}
                    title="Available for allocation"
                  />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-foreground/70" />
                    <span>Used: {formatCurrency(balance.usedValue)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Allocated: {formatCurrency(balance.allocatedValue)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span>Available: {formatCurrency(balance.availableForAllocation)}</span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Recovered:</span>
                  <span className="font-medium text-success">
                    {formatCurrency(balance.recoveredValue)}
                  </span>
                </div>
                {projectedLoss > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Still at risk:</span>
                    <Badge variant="destructive" className="text-xs">
                      {formatCurrency(projectedLoss)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
