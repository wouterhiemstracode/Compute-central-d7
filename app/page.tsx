import { DashboardHeader } from "@/components/dashboard-header"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { RecoveredValueBanner } from "@/components/recovered-value-banner"
import { CreditBreakdown } from "@/components/credit-breakdown"
import { PortfolioChart } from "@/components/portfolio-chart"
import { PayWithCompute } from "@/components/pay-with-compute"
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
          <h2 className="text-lg font-semibold mb-4">Credit Efficiency</h2>
          <PortfolioOverview />
        </section>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="efficiency" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="allocate">Allocate</TabsTrigger>
            <TabsTrigger value="history">Usage & Recovery</TabsTrigger>
          </TabsList>

          <TabsContent value="efficiency" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <CreditBreakdown />
              <PortfolioChart />
            </div>
          </TabsContent>

          <TabsContent value="allocate">
            <div className="max-w-lg">
              <PayWithCompute />
            </div>
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
            <p>Compute Central</p>
            <p>Track, optimize, and recover cloud compute credits</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
