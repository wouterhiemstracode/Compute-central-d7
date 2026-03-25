// Mock data for Compute Central - Credit Efficiency Tracker

export type Provider = "aws" | "gcp" | "azure"

export interface CreditBalance {
  provider: Provider
  name: string
  credits: number
  dollarValue: number
  usedValue: number
  expiredValue: number
  recoveredValue: number
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

export const creditBalances: CreditBalance[] = [
  {
    provider: "aws",
    name: "Amazon Web Services",
    credits: 120000,
    dollarValue: 120000,
    usedValue: 108000,
    expiredValue: 2400,
    recoveredValue: 9600,
    expirationDate: new Date("2026-09-25"),
    monthlyBurn: 18000,
    color: "var(--chart-1)",
  },
  {
    provider: "gcp",
    name: "Google Cloud Platform",
    credits: 50000,
    dollarValue: 50000,
    usedValue: 36000,
    expiredValue: 5200,
    recoveredValue: 8800,
    expirationDate: new Date("2026-06-25"),
    monthlyBurn: 12000,
    color: "var(--chart-2)",
  },
  {
    provider: "azure",
    name: "Microsoft Azure",
    credits: 30000,
    dollarValue: 30000,
    usedValue: 25000,
    expiredValue: 1800,
    recoveredValue: 3200,
    expirationDate: new Date("2026-12-25"),
    monthlyBurn: 5000,
    color: "var(--chart-3)",
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
