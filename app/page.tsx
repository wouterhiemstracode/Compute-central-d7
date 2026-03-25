import { DashboardHeader } from "@/components/dashboard-header"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { CreditBreakdown } from "@/components/credit-breakdown"
import { PortfolioChart } from "@/components/portfolio-chart"
import { PayWithCompute } from "@/components/pay-with-compute"
import { MarketplaceView } from "@/components/marketplace-view"
import { TransactionHistory } from "@/components/transaction-history"
import { OptimizationAlert } from "@/components/optimization-alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComputeExchangeDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Optimization Alert */}
        <OptimizationAlert />
        
        {/* Portfolio Overview Stats */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>
          <PortfolioOverview />
        </section>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pay">Pay</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <CreditBreakdown />
              <PortfolioChart />
            </div>
          </TabsContent>

          <TabsContent value="pay">
            <div className="max-w-lg">
              <PayWithCompute />
            </div>
          </TabsContent>

          <TabsContent value="marketplace">
            <MarketplaceView />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Compute Credits Exchange</p>
            <p>Prototype — Compute as Currency</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
