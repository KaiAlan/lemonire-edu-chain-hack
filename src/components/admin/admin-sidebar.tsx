"use client"

import { Home, Briefcase, PlusCircle, Building } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AdminSidebarProps {
  onDashboardClick: () => void
  onJobsClick: () => void
  onCreateJobClick: () => void
  currentView: string
}

export function AdminSidebar({ onDashboardClick, onJobsClick, onCreateJobClick, currentView }: AdminSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-4">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <h2 className="text-lg font-semibold">TechCorp Admin</h2>
          </div>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onDashboardClick} isActive={currentView === "overview"}>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onJobsClick} isActive={currentView === "jobs" || currentView === "job-details"}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Listed Jobs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onCreateJobClick} isActive={currentView === "create-job"}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Create New Job</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Company" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">TechCorp</span>
            <span className="text-xs text-muted-foreground">admin@techcorp.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

