"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidateProfileInfo } from "@/components/profile/candidate-profile-info"
import { CandidateProfileResume } from "@/components/profile/candidate-profile-resume"
import { CandidateProfileSettings } from "@/components/profile/candidate-profile-settings"

export function CandidateProfile() {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="flex flex-col">
            <div className="border-b">
              <div className="container py-6">
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and resume</p>
              </div>
            </div>
            <div className="container py-6">
              <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="info">Personal Information</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="settings">Account Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <CandidateProfileInfo />
                </TabsContent>
                <TabsContent value="resume">
                  <CandidateProfileResume />
                </TabsContent>
                <TabsContent value="settings">
                  <CandidateProfileSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

