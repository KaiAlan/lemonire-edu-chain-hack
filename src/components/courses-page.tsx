"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { CourseListings } from "@/components/course-listings"
import { SidebarProvider } from "@/components/ui/sidebar"

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: "all",
    level: "all",
    duration: "all",
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="flex flex-col">
            <div className="border-b">
              <div className="container py-6">
                <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                <p className="text-muted-foreground">Enhance your skills with our curated courses</p>
              </div>
            </div>
            <CourseListings
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

