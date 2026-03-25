"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  formatCurrency,
  getTotalSupplierValueRecovered,
  getTotalBuyerSavings,
  getTotalPlatformFees,
  getTotalValueCreated,
} from "@/lib/data"
import { DollarSign, TrendingUp, Building2, Sparkles } from "lucide-react"

export function ValueBreakdown() {
  const supplierRecovered = getTotalSupplierValueRecovered()
  const buyerSavings = getTotalBuyerSavings()
  const platformFees = getTotalPlatformFees()
  const totalValue = getTotalValueCreated()

  const breakdown = [
    {
      title: "Supplier Value Recovered",
      value: supplierRecovered,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Credits saved from expiring",
    },
    {
      title: "Buyer Savings",
      value: buyerSavings,
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Discounted compute costs",
    },
    {
      title: "Platform Fee Earned",
      value: platformFees,
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Matching service fee",
    },
    {
      title: "Total Value Created",
      value: totalValue,
      icon: Sparkles,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Combined savings",
      highlight: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Value Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {breakdown.map((item) => (
            <div
              key={item.title}
              className={`rounded-lg p-4 ${item.bgColor} ${
                item.highlight ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </span>
              </div>
              <p className={`text-2xl font-bold ${item.color}`}>
                {formatCurrency(item.value)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
