import { DashboardHeader } from "@/components/dashboard-header"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { RecoveredValueBanner } from "@/components/recovered-value-banner"
import { CreditBreakdown } from "@/components/credit-breakdown"
import { PortfolioChart } from "@/components/portfolio-chart"
import { ExpiringCreditsSupply } from "@/components/expiring-credits-supply"
import { ComputeDemand } from "@/components/compute-demand"
import { MatchingEngine } from "@/components/matching-engine"
import { ValueBreakdown } from "@/components/value-breakdown"
import { PlatformFlow } from "@/components/platform-flow"
import { TransactionHistory } from "@/components/transaction-history"
import { OptimizationAlert } from "@/components/optimization-alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComputeCentralDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Optimization Alert */}
        <OptimizationAlert />

        {/* Recovered Value Banner */}
        <RecoveredValueBanner />
        
        {/* Portfolio Overview Stats */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Platform Metrics</h2>
          <PortfolioOverview />
        </section>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* How it works */}
            <PlatformFlow />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <CreditBreakdown />
              <PortfolioChart />
            </div>
            
            {/* Value breakdown */}
            <ValueBreakdown />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Supply and Demand tables */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ExpiringCreditsSupply />
              <ComputeDemand />
            </div>
            
            {/* Matching Engine */}
            <MatchingEngine />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Compute Central</p>
            <p className="text-center italic text-xs">
              All allocations are simulated. Cloud providers currently do not support direct transfer of credits.
            </p>
            <p>Track, recover, and reallocate compute credits</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
