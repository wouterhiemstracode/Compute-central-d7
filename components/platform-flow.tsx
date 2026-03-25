"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building2, Users, Zap } from "lucide-react"

export function PlatformFlow() {
  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-center">How It Works</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Supply */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border w-full md:w-48">
            <div className="rounded-full bg-warning/10 p-3 mb-3">
              <Users className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold">Supply</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Suppliers sell expiring credits at discount
            </p>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:hidden" />

          {/* Platform */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5 border-2 border-primary/20 w-full md:w-48">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-primary">Platform</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Matches and allocates compute usage
            </p>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
          <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:hidden" />

          {/* Demand */}
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border w-full md:w-48">
            <div className="rounded-full bg-success/10 p-3 mb-3">
              <Building2 className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold">Demand</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Buyers receive discounted compute
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Platform takes a small fee for facilitating the match, creating value for both 
            suppliers (recovered credits) and buyers (discounted compute).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
