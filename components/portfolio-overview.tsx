"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getTotalCreditsReceived,
  getTotalCreditsUsed,
  getTotalCreditsExpired,
  getTotalCreditsRecovered,
  getUtilizationPercent,
  getRecoveryPercent,
  formatCurrency,
} from "@/lib/data"
import { TrendingUp, Activity, XCircle, Sparkles } from "lucide-react"

export function PortfolioOverview() {
  const totalReceived = getTotalCreditsReceived()
  const totalUsed = getTotalCreditsUsed()
  const totalExpired = getTotalCreditsExpired()
  const totalRecovered = getTotalCreditsRecovered()
  const utilizationPercent = getUtilizationPercent()
  const recoveryPercent = getRecoveryPercent()

  const stats = [
    {
      title: "Total Credits Received",
      value: formatCurrency(totalReceived),
      icon: TrendingUp,
      description: "All-time credits acquired",
      accent: false,
    },
    {
      title: "Credits Used (Internal)",
      value: formatCurrency(totalUsed),
      icon: Activity,
      description: `${utilizationPercent}% utilization`,
      accent: false,
    },
    {
      title: "Credits Expired (Lost)",
      value: formatCurrency(totalExpired),
      icon: XCircle,
      description: "Could not be recovered",
      accent: "destructive",
    },
    {
      title: "Credits Recovered",
      value: formatCurrency(totalRecovered),
      icon: Sparkles,
      description: `${recoveryPercent}% recovered vs lost`,
      accent: "success",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={`relative overflow-hidden ${
            stat.accent === "success"
              ? "ring-2 ring-success/30 bg-success/5"
              : stat.accent === "destructive"
              ? "bg-destructive/5"
              : ""
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon
              className={`h-4 w-4 ${
                stat.accent === "success"
                  ? "text-success"
                  : stat.accent === "destructive"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                stat.accent === "success"
                  ? "text-success"
                  : stat.accent === "destructive"
                  ? "text-destructive"
                  : ""
              }`}
            >
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
