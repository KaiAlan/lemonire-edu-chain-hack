"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { JobListings } from "@/components/job-listings"
import { SidebarProvider } from "@/components/ui/sidebar"

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    jobType: "all",
    location: "all",
    experience: "all",
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="flex flex-col">
            <div className="border-b">
              <div className="container py-6">
                <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
                <p className="text-muted-foreground">Find your dream job from thousands of listings</p>
              </div>
            </div>
            <JobListings
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

