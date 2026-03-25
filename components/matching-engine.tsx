"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  creditMatches,
  formatCurrency,
  getTotalCreditsMatched,
} from "@/lib/data"
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react"

export function MatchingEngine() {
  const [isMatching, setIsMatching] = useState(false)
  const totalMatched = getTotalCreditsMatched()

  const handleMatch = () => {
    setIsMatching(true)
    setTimeout(() => setIsMatching(false), 2000)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Matching Engine
            </CardTitle>
            <CardDescription>
              Allocation of expiring credits to active demand
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Credits matched</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(totalMatched)}</p>
            </div>
            <Button onClick={handleMatch} disabled={isMatching}>
              {isMatching ? (
                <>
                  <span className="animate-pulse">Matching...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Matching
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary banner */}
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <p className="text-center text-lg font-medium">
            <span className="text-primary font-bold">{formatCurrency(totalMatched)}</span>
            {" "}of expiring credits matched to active demand
          </p>
        </div>

        {/* Matches table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From (Supplier)</TableHead>
              <TableHead className="text-center">Provider</TableHead>
              <TableHead>To (Buyer)</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditMatches.map((match) => (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.supplier}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor:
                          match.provider === "aws"
                            ? "#FF9900"
                            : match.provider === "gcp"
                            ? "#4285F4"
                            : "#00BCF2",
                        color:
                          match.provider === "aws"
                            ? "#FF9900"
                            : match.provider === "gcp"
                            ? "#4285F4"
                            : "#00BCF2",
                      }}
                    >
                      {match.provider.toUpperCase()}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{match.buyer}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(match.amount)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="text-success border-success">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Recovered
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
