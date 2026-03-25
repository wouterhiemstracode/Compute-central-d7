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
} from "@/lib/data"

export function CreditBreakdown() {
  const totalAtRisk = getTotalAtRisk()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Credit Breakdown by Provider</CardTitle>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total at risk</p>
            <p className="font-bold text-destructive">{formatCurrency(totalAtRisk)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {creditBalances.map((balance) => {
          const monthsLeft = getMonthsUntilExpiry(balance.expirationDate)
          const projectedUsage = balance.monthlyBurn * monthsLeft
          const projectedLoss = Math.max(0, balance.dollarValue - projectedUsage)
          const usedPercent = (balance.usedValue / balance.dollarValue) * 100
          const recoveredPercent = (balance.recoveredValue / balance.dollarValue) * 100

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

              {/* Usage bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Used internally</span>
                  <span className="font-medium">{formatCurrency(balance.usedValue)}</span>
                </div>
                <Progress value={usedPercent} className="h-2" />
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Recovered:</span>
                  <span className="font-medium text-success">
                    {formatCurrency(balance.recoveredValue)}
                  </span>
                </div>
                {projectedLoss > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                    <span className="text-muted-foreground">Projected loss:</span>
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
