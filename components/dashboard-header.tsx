"use client"

import { Button } from "@/components/ui/button"
import { Cpu, Bell, Settings, Cloud } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Cpu className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Compute Central</h1>
              <p className="text-xs text-muted-foreground">
                Track, recover, and reallocate compute credits across companies
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button size="sm" variant="outline">
              <Cloud className="h-4 w-4 mr-2" />
              Connect Provider
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
