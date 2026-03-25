"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { creditBalances, formatCurrency } from "@/lib/data"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const COLORS = {
  aws: "#FF9900",
  gcp: "#4285F4",
  azure: "#00BCF2",
}

export function PortfolioChart() {
  const data = creditBalances.map((b) => ({
    name: b.provider.toUpperCase(),
    value: b.dollarValue,
    color: COLORS[b.provider],
  }))

  const totalValue = creditBalances.reduce((sum, b) => sum + b.dollarValue, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 flex-1">
            {creditBalances.map((balance) => {
              const percentage = ((balance.dollarValue / totalValue) * 100).toFixed(1)
              return (
                <div key={balance.provider} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[balance.provider] }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {balance.provider.toUpperCase()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(balance.dollarValue)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
