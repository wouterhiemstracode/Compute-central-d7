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
import { creditSupply, formatCurrency, getTotalSupplyAtRisk } from "@/lib/data"
import { AlertTriangle, TrendingDown } from "lucide-react"

export function ExpiringCreditsSupply() {
  const totalAtRisk = getTotalSupplyAtRisk()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-warning" />
              Expiring Credits Supply
            </CardTitle>
            <CardDescription>
              Companies with credits at risk of expiring
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total at risk</p>
            <p className="text-lg font-bold text-warning">{formatCurrency(totalAtRisk)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="text-right">Credits</TableHead>
              <TableHead className="text-center">Expiry</TableHead>
              <TableHead className="text-right">Value at Risk</TableHead>
              <TableHead className="text-right">Suggested Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditSupply.map((supply) => (
              <TableRow key={supply.id}>
                <TableCell className="font-medium">{supply.company}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor:
                        supply.provider === "aws"
                          ? "#FF9900"
                          : supply.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                      color:
                        supply.provider === "aws"
                          ? "#FF9900"
                          : supply.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                    }}
                  >
                    {supply.provider.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(supply.credits)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={supply.expiresInMonths <= 1 ? "destructive" : "outline"}
                    className={supply.expiresInMonths <= 2 && supply.expiresInMonths > 1 ? "border-warning text-warning" : ""}
                  >
                    <AlertTriangle className={`h-3 w-3 mr-1 ${supply.expiresInMonths <= 1 ? "" : "opacity-0"}`} />
                    {supply.expiresInMonths} {supply.expiresInMonths === 1 ? "month" : "months"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-destructive font-medium">
                  {formatCurrency(supply.valueAtRisk)}
                </TableCell>
                <TableCell className="text-right text-success font-medium">
                  {formatCurrency(supply.suggestedSellValue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
