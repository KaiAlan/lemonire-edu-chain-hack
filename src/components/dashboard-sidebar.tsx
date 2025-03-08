"use client"

import { usePathname } from "next/navigation"
import { Home, BookOpen, Briefcase, FileCheck } from "lucide-react"
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

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-4">
          <h2 className="text-lg font-semibold">JobPortal</h2>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <a href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/courses" || pathname.startsWith("/courses/")}>
              <a href="/courses" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Courses</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/applied-jobs" || pathname.startsWith("/applied-jobs/")}>
              <a href="/applied-jobs" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Applied Jobs</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/tests" || pathname.startsWith("/tests/")}>
              <a href="/tests" className="flex items-center">
                <FileCheck className="mr-2 h-4 w-4" />
                <span>Tests</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john.doe@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

