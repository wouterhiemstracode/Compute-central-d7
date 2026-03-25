"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  creditBalances,
  formatCurrency,
  formatDate,
  getMonthsUntilExpiry,
} from "@/lib/data"

export function CreditBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Breakdown by Provider</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {creditBalances.map((balance) => {
          const monthsLeft = getMonthsUntilExpiry(balance.expirationDate)
          const projectedUsage = balance.monthlyBurn * monthsLeft
          const usagePercent = Math.min(100, (projectedUsage / balance.dollarValue) * 100)
          const atRisk = balance.dollarValue > projectedUsage
          const riskAmount = balance.dollarValue - projectedUsage

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
                    <p className="text-sm text-muted-foreground">
                      Expires {formatDate(balance.expirationDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatCurrency(balance.dollarValue)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(balance.monthlyBurn)}/mo burn
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Projected usage before expiry
                  </span>
                  <span className="font-medium">{formatCurrency(projectedUsage)}</span>
                </div>
                <Progress value={usagePercent} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {monthsLeft} months until expiry
                  </span>
                  {atRisk && riskAmount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {formatCurrency(riskAmount)} at risk
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
