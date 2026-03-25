"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  transactions,
  formatCurrency,
  formatDate,
  type Provider,
} from "@/lib/data"
import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function TransactionHistory() {
  const [filter, setFilter] = useState<Provider | "all">("all")

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.provider === filter)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Transaction History
        </CardTitle>
        <Select
          value={filter}
          onValueChange={(v) => setFilter(v as Provider | "all")}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="aws">AWS</SelectItem>
            <SelectItem value="gcp">GCP</SelectItem>
            <SelectItem value="azure">Azure</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No transactions found
            </p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === "payment"
                        ? "bg-destructive/10"
                        : "bg-success/10"
                    }`}
                  >
                    {transaction.type === "payment" ? (
                      <ArrowUpRight className="h-4 w-4 text-destructive" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.recipient}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor:
                        transaction.provider === "aws"
                          ? "#FF9900"
                          : transaction.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                      color:
                        transaction.provider === "aws"
                          ? "#FF9900"
                          : transaction.provider === "gcp"
                          ? "#4285F4"
                          : "#00BCF2",
                    }}
                  >
                    {transaction.provider.toUpperCase()}
                  </Badge>
                  <p
                    className={`font-bold ${
                      transaction.type === "payment"
                        ? "text-destructive"
                        : "text-success"
                    }`}
                  >
                    {transaction.type === "payment" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
