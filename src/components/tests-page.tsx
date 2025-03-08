"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { TestsList } from "@/components/tests-list"
import { SidebarProvider } from "@/components/ui/sidebar"

export function TestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="flex flex-col">
            <div className="border-b">
              <div className="container py-6">
                <h1 className="text-3xl font-bold tracking-tight">Assessment Tests</h1>
                <p className="text-muted-foreground">Complete technical assessments for your job applications</p>
              </div>
            </div>
            <TestsList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

