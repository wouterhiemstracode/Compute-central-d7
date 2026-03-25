"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { computeDemand, formatCurrency } from "@/lib/data"
import { TrendingUp } from "lucide-react"

export function ComputeDemand() {
  const totalDemand = computeDemand.reduce((sum, d) => sum + d.monthlyUsage, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Compute Demand
            </CardTitle>
            <CardDescription>
              Companies actively seeking compute credits
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Monthly demand</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(totalDemand)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Monthly Usage</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-center">Urgency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computeDemand.map((demand) => (
              <TableRow key={demand.id}>
                <TableCell className="font-medium">{demand.company}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(demand.monthlyUsage)}/mo
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor:
                        demand.provider === "aws"
                          ? "#FF9900"
                          : demand.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                      color:
                        demand.provider === "aws"
                          ? "#FF9900"
                          : demand.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                    }}
                  >
                    {demand.provider.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(demand.budget)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      demand.urgency === "high"
                        ? "destructive"
                        : demand.urgency === "medium"
                        ? "outline"
                        : "secondary"
                    }
                    className={demand.urgency === "medium" ? "border-warning text-warning" : ""}
                  >
                    {demand.urgency.charAt(0).toUpperCase() + demand.urgency.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
