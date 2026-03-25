"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { creditBalances, formatCurrency, getMonthsUntilExpiry } from "@/lib/data"
import { TrendingDown, Wallet, Clock, Flame } from "lucide-react"

export function PortfolioOverview() {
  const totalValue = creditBalances.reduce((sum, b) => sum + b.dollarValue, 0)
  const totalMonthlyBurn = creditBalances.reduce((sum, b) => sum + b.monthlyBurn, 0)
  const nearestExpiry = creditBalances.reduce((nearest, b) => {
    const months = getMonthsUntilExpiry(b.expirationDate)
    return months < nearest ? months : nearest
  }, Infinity)

  const stats = [
    {
      title: "Total Portfolio Value",
      value: formatCurrency(totalValue),
      icon: Wallet,
      description: "Across all providers",
    },
    {
      title: "Monthly Burn Rate",
      value: formatCurrency(totalMonthlyBurn),
      icon: Flame,
      description: "Current usage rate",
    },
    {
      title: "Nearest Expiration",
      value: `${nearestExpiry} months`,
      icon: Clock,
      description: "Until credits expire",
    },
    {
      title: "Providers Active",
      value: creditBalances.length.toString(),
      icon: TrendingDown,
      description: "Cloud platforms",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
