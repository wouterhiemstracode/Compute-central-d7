// Mock data for Compute Credits Exchange

export type Provider = "aws" | "gcp" | "azure"

export interface CreditBalance {
  provider: Provider
  name: string
  credits: number
  dollarValue: number
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
  type: "payment" | "received"
}

export const creditBalances: CreditBalance[] = [
  {
    provider: "aws",
    name: "Amazon Web Services",
    credits: 120000,
    dollarValue: 120000,
    expirationDate: new Date("2026-09-25"),
    monthlyBurn: 18000,
    color: "var(--chart-1)",
  },
  {
    provider: "gcp",
    name: "Google Cloud Platform",
    credits: 50000,
    dollarValue: 50000,
    expirationDate: new Date("2026-06-25"),
    monthlyBurn: 12000,
    color: "var(--chart-2)",
  },
  {
    provider: "azure",
    name: "Microsoft Azure",
    credits: 30000,
    dollarValue: 30000,
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
    type: "payment",
  },
  {
    id: "2",
    date: new Date("2026-03-18"),
    recipient: "DevForge Tools",
    amount: 3200,
    provider: "gcp",
    type: "payment",
  },
  {
    id: "3",
    date: new Date("2026-03-15"),
    recipient: "CloudOps Consulting",
    amount: 12000,
    provider: "aws",
    type: "payment",
  },
  {
    id: "4",
    date: new Date("2026-03-10"),
    recipient: "TechStart Inc",
    amount: 5000,
    provider: "azure",
    type: "received",
  },
  {
    id: "5",
    date: new Date("2026-03-05"),
    recipient: "MLPipeline Pro",
    amount: 18000,
    provider: "gcp",
    type: "payment",
  },
  {
    id: "6",
    date: new Date("2026-02-28"),
    recipient: "SecureVault",
    amount: 4500,
    provider: "aws",
    type: "payment",
  },
]

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
