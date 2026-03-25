// Mock data for Compute Central - Credit Marketplace & Allocation Platform

export type Provider = "aws" | "gcp" | "azure"

export interface CreditBalance {
  provider: Provider
  name: string
  credits: number
  dollarValue: number
  usedValue: number
  expiredValue: number
  recoveredValue: number
  allocatedValue: number
  availableForAllocation: number
  expirationDate: Date
  monthlyBurn: number
  color: string
}

export interface Vendor {
  id: string
  name: string
  description: string
  acceptedProviders: Provider[]
  minPrice: number
  category: string
}

export interface Transaction {
  id: string
  date: Date
  recipient: string
  amount: number
  provider: Provider
  type: "allocation" | "recovery"
}

// New types for marketplace
export interface CreditSupply {
  id: string
  company: string
  provider: Provider
  credits: number
  expiresInMonths: number
  valueAtRisk: number
  suggestedSellValue: number
}

export interface ComputeDemand {
  id: string
  company: string
  monthlyUsage: number
  provider: Provider
  budget: number
  urgency: "high" | "medium" | "low"
}

export interface CreditMatch {
  id: string
  supplier: string
  buyer: string
  amount: number
  provider: Provider
  supplierRecovered: number
  buyerSaved: number
  platformFee: number
  status: "matched" | "pending"
}

export const creditBalances: CreditBalance[] = [
  {
    provider: "aws",
    name: "Amazon Web Services",
    credits: 120000,
    dollarValue: 120000,
    usedValue: 78000,
    expiredValue: 2400,
    recoveredValue: 9600,
    allocatedValue: 18000,
    availableForAllocation: 12000,
    expirationDate: new Date("2026-09-25"),
    monthlyBurn: 18000,
    color: "var(--chart-1)",
  },
  {
    provider: "gcp",
    name: "Google Cloud Platform",
    credits: 50000,
    dollarValue: 50000,
    usedValue: 26000,
    expiredValue: 5200,
    recoveredValue: 8800,
    allocatedValue: 7000,
    availableForAllocation: 3000,
    expirationDate: new Date("2026-06-25"),
    monthlyBurn: 12000,
    color: "var(--chart-2)",
  },
  {
    provider: "azure",
    name: "Microsoft Azure",
    credits: 30000,
    dollarValue: 30000,
    usedValue: 20000,
    expiredValue: 1800,
    recoveredValue: 3200,
    allocatedValue: 3000,
    availableForAllocation: 2000,
    expirationDate: new Date("2026-12-25"),
    monthlyBurn: 5000,
    color: "var(--chart-3)",
  },
]

// Marketplace data: Companies with expiring credits (supply)
export const creditSupply: CreditSupply[] = [
  {
    id: "s1",
    company: "TechFlow Inc",
    provider: "aws",
    credits: 20000,
    expiresInMonths: 2,
    valueAtRisk: 12000,
    suggestedSellValue: 6000,
  },
  {
    id: "s2",
    company: "DataPipe Labs",
    provider: "gcp",
    credits: 10000,
    expiresInMonths: 1,
    valueAtRisk: 8000,
    suggestedSellValue: 3000,
  },
  {
    id: "s3",
    company: "CloudFirst Co",
    provider: "aws",
    credits: 15000,
    expiresInMonths: 3,
    valueAtRisk: 6000,
    suggestedSellValue: 4500,
  },
  {
    id: "s4",
    company: "Nimbus Systems",
    provider: "azure",
    credits: 8000,
    expiresInMonths: 2,
    valueAtRisk: 4000,
    suggestedSellValue: 2400,
  },
]

// Marketplace data: Companies needing compute (demand)
export const computeDemand: ComputeDemand[] = [
  {
    id: "d1",
    company: "ScaleUp AI",
    monthlyUsage: 5000,
    provider: "aws",
    budget: 4000,
    urgency: "high",
  },
  {
    id: "d2",
    company: "BuildFast Dev",
    monthlyUsage: 8000,
    provider: "gcp",
    budget: 6000,
    urgency: "medium",
  },
  {
    id: "d3",
    company: "Rapid Deploy",
    monthlyUsage: 3000,
    provider: "aws",
    budget: 2500,
    urgency: "high",
  },
  {
    id: "d4",
    company: "ML Forge",
    monthlyUsage: 12000,
    provider: "azure",
    budget: 9000,
    urgency: "low",
  },
]

// Completed matches
export const creditMatches: CreditMatch[] = [
  {
    id: "m1",
    supplier: "TechFlow Inc",
    buyer: "ScaleUp AI",
    amount: 5000,
    provider: "aws",
    supplierRecovered: 2500,
    buyerSaved: 1000,
    platformFee: 250,
    status: "matched",
  },
  {
    id: "m2",
    supplier: "DataPipe Labs",
    buyer: "BuildFast Dev",
    amount: 7000,
    provider: "gcp",
    supplierRecovered: 2800,
    buyerSaved: 1400,
    platformFee: 350,
    status: "matched",
  },
  {
    id: "m3",
    supplier: "CloudFirst Co",
    buyer: "Rapid Deploy",
    amount: 3000,
    provider: "aws",
    supplierRecovered: 1500,
    buyerSaved: 600,
    platformFee: 150,
    status: "matched",
  },
  {
    id: "m4",
    supplier: "Nimbus Systems",
    buyer: "ML Forge",
    amount: 4000,
    provider: "azure",
    supplierRecovered: 2000,
    buyerSaved: 800,
    platformFee: 200,
    status: "matched",
  },
]

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "DataStream Analytics",
    description: "Real-time data processing and analytics platform",
    acceptedProviders: ["aws", "gcp"],
    minPrice: 5000,
    category: "Data Provider",
  },
  {
    id: "2",
    name: "DevForge Tools",
    description: "Developer productivity and CI/CD solutions",
    acceptedProviders: ["aws", "gcp", "azure"],
    minPrice: 2500,
    category: "Dev Tools",
  },
  {
    id: "3",
    name: "CloudOps Consulting",
    description: "Infrastructure optimization and consulting services",
    acceptedProviders: ["aws", "azure"],
    minPrice: 10000,
    category: "Contractor",
  },
  {
    id: "4",
    name: "MLPipeline Pro",
    description: "Machine learning infrastructure and model deployment",
    acceptedProviders: ["gcp", "aws"],
    minPrice: 15000,
    category: "AI/ML",
  },
  {
    id: "5",
    name: "SecureVault",
    description: "Cloud security and compliance monitoring",
    acceptedProviders: ["aws", "gcp", "azure"],
    minPrice: 3000,
    category: "Security",
  },
]

export const transactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2026-03-20"),
    recipient: "DataStream Analytics",
    amount: 8500,
    provider: "aws",
    type: "allocation",
  },
  {
    id: "2",
    date: new Date("2026-03-18"),
    recipient: "DevForge Tools",
    amount: 3200,
    provider: "gcp",
    type: "allocation",
  },
  {
    id: "3",
    date: new Date("2026-03-15"),
    recipient: "CloudOps Consulting",
    amount: 12000,
    provider: "aws",
    type: "allocation",
  },
  {
    id: "4",
    date: new Date("2026-03-10"),
    recipient: "Credits recovered before expiry",
    amount: 5000,
    provider: "azure",
    type: "recovery",
  },
  {
    id: "5",
    date: new Date("2026-03-05"),
    recipient: "MLPipeline Pro",
    amount: 18000,
    provider: "gcp",
    type: "allocation",
  },
  {
    id: "6",
    date: new Date("2026-02-28"),
    recipient: "Credits recovered before expiry",
    amount: 4500,
    provider: "aws",
    type: "recovery",
  },
]

// Summary calculations
export function getTotalCreditsReceived(): number {
  return creditBalances.reduce((sum, b) => sum + b.dollarValue, 0)
}

export function getTotalCreditsUsed(): number {
  return creditBalances.reduce((sum, b) => sum + b.usedValue, 0)
}

export function getTotalCreditsExpired(): number {
  return creditBalances.reduce((sum, b) => sum + b.expiredValue, 0)
}

export function getTotalCreditsRecovered(): number {
  return creditBalances.reduce((sum, b) => sum + b.recoveredValue, 0)
}

export function getTotalCreditsAllocated(): number {
  return creditBalances.reduce((sum, b) => sum + b.allocatedValue, 0)
}

export function getTotalAvailableForAllocation(): number {
  return creditBalances.reduce((sum, b) => sum + b.availableForAllocation, 0)
}

// Marketplace calculations
export function getTotalCreditsMatched(): number {
  return creditMatches.reduce((sum, m) => sum + m.amount, 0)
}

export function getTotalSupplierValueRecovered(): number {
  return creditMatches.reduce((sum, m) => sum + m.supplierRecovered, 0)
}

export function getTotalBuyerSavings(): number {
  return creditMatches.reduce((sum, m) => sum + m.buyerSaved, 0)
}

export function getTotalPlatformFees(): number {
  return creditMatches.reduce((sum, m) => sum + m.platformFee, 0)
}

export function getTotalValueCreated(): number {
  return getTotalSupplierValueRecovered() + getTotalBuyerSavings()
}

export function getUtilizationPercent(): number {
  const total = getTotalCreditsReceived()
  const used = getTotalCreditsUsed()
  return Math.round((used / total) * 100)
}

export function getRecoveryPercent(): number {
  const recovered = getTotalCreditsRecovered()
  const expired = getTotalCreditsExpired()
  const atRisk = recovered + expired
  if (atRisk === 0) return 100
  return Math.round((recovered / atRisk) * 100)
}

export function getProviderIcon(provider: Provider): string {
  switch (provider) {
    case "aws":
      return "AWS"
    case "gcp":
      return "GCP"
    case "azure":
      return "Azure"
  }
}

export function getProviderColor(provider: Provider): string {
  switch (provider) {
    case "aws":
      return "bg-[#FF9900]"
    case "gcp":
      return "bg-[#4285F4]"
    case "azure":
      return "bg-[#00BCF2]"
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export function getMonthsUntilExpiry(expirationDate: Date): number {
  const now = new Date()
  const diffTime = expirationDate.getTime() - now.getTime()
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30)
  return Math.max(0, Math.round(diffMonths))
}

export function calculateOptimizationSuggestions(): {
  atRisk: number
  provider: Provider
  months: number
}[] {
  return creditBalances
    .map((balance) => {
      const monthsLeft = getMonthsUntilExpiry(balance.expirationDate)
      const projectedUsage = balance.monthlyBurn * monthsLeft
      const atRisk = Math.max(0, balance.dollarValue - projectedUsage)
      return {
        atRisk,
        provider: balance.provider,
        months: monthsLeft,
      }
    })
    .filter((suggestion) => suggestion.atRisk > 0)
    .sort((a, b) => b.atRisk - a.atRisk)
}

export function getTotalAtRisk(): number {
  return calculateOptimizationSuggestions().reduce((sum, s) => sum + s.atRisk, 0)
}

export function getTotalSupplyAtRisk(): number {
  return creditSupply.reduce((sum, s) => sum + s.valueAtRisk, 0)
}
