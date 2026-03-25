"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { vendors, formatCurrency } from "@/lib/data"
import { Store, ExternalLink } from "lucide-react"

export function MarketplaceView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Marketplace
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium truncate">{vendor.name}</h4>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {vendor.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {vendor.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Accepts:</span>
                  {vendor.acceptedProviders.map((provider) => (
                    <Badge
                      key={provider}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor:
                          provider === "aws"
                            ? "#FF9900"
                            : provider === "gcp"
                            ? "#4285F4"
                            : "#00BCF2",
                        color:
                          provider === "aws"
                            ? "#FF9900"
                            : provider === "gcp"
                            ? "#4285F4"
                            : "#00BCF2",
                      }}
                    >
                      {provider.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-bold">{formatCurrency(vendor.minPrice)}</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  View
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
