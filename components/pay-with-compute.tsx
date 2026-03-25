"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, ArrowRight, Send } from "lucide-react"
import {
  creditBalances,
  vendors,
  formatCurrency,
  type Provider,
} from "@/lib/data"

export function PayWithCompute() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [provider, setProvider] = useState<Provider | "auto">("auto")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedProvider =
    provider === "auto"
      ? creditBalances.reduce((prev, curr) =>
          curr.dollarValue > prev.dollarValue ? curr : prev
        ).provider
      : provider

  const selectedBalance = creditBalances.find(
    (b) => b.provider === selectedProvider
  )

  const handlePay = () => {
    setShowConfirmation(true)
  }

  const confirmPayment = () => {
    setShowConfirmation(false)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setRecipient("")
      setAmount("")
      setProvider("auto")
    }, 3000)
  }

  const isValid =
    recipient && amount && parseFloat(amount) > 0 && selectedBalance

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Pay with Compute
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Company</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select vendor or enter company" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.name}>
                    <div className="flex flex-col">
                      <span>{vendor.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Accepts: {vendor.acceptedProviders.map(p => p.toUpperCase()).join(", ")}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD equivalent)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select
              value={provider}
              onValueChange={(v) => setProvider(v as Provider | "auto")}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">
                  <div className="flex items-center gap-2">
                    <span>Auto-select</span>
                    <span className="text-xs text-muted-foreground">
                      (Highest balance)
                    </span>
                  </div>
                </SelectItem>
                {creditBalances.map((balance) => (
                  <SelectItem key={balance.provider} value={balance.provider}>
                    <div className="flex items-center gap-2">
                      <span>{balance.provider.toUpperCase()}</span>
                      <span className="text-xs text-muted-foreground">
                        ({formatCurrency(balance.dollarValue)} available)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {amount && selectedBalance && (
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">From</span>
                <span className="font-medium">
                  {selectedBalance.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Credits to deduct</span>
                <span className="font-medium">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remaining after</span>
                <span className="font-medium">
                  {formatCurrency(selectedBalance.dollarValue - parseFloat(amount))}
                </span>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            disabled={!isValid}
            onClick={handlePay}
          >
            Review Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Review the details of your compute credit payment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Recipient</span>
              <span className="font-medium">{recipient}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{formatCurrency(parseFloat(amount || "0"))}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Provider</span>
              <span className="font-medium">{selectedProvider.toUpperCase()}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPayment}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center">
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="rounded-full bg-success/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-center">Payment Successful!</DialogTitle>
              <DialogDescription className="text-center">
                {formatCurrency(parseFloat(amount || "0"))} in{" "}
                {selectedProvider.toUpperCase()} credits has been transferred to{" "}
                {recipient}.
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
