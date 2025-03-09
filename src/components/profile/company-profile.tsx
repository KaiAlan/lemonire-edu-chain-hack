"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyProfileInfo } from "@/components/profile/company-profile-info"
import { CompanyProfileTeam } from "@/components/profile/company-profile-team"
import { CompanyProfileSettings } from "@/components/profile/company-profile-settings"

export function CompanyProfile() {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar
          onDashboardClick={() => {}}
          onJobsClick={() => {}}
          onCreateJobClick={() => {}}
          currentView="profile"
        />
        <main className="flex-1">
          <div className="flex flex-col">
            <div className="border-b">
              <div className="container py-6">
                <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
                <p className="text-muted-foreground">Manage your company information and settings</p>
              </div>
            </div>
            <div className="container py-6">
              <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="info">Company Information</TabsTrigger>
                  <TabsTrigger value="team">Team Members</TabsTrigger>
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <CompanyProfileInfo />
                </TabsContent>
                <TabsContent value="team">
                  <CompanyProfileTeam />
                </TabsContent>
                <TabsContent value="settings">
                  <CompanyProfileSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

