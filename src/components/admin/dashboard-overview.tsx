"use client"

import { ArrowUpRight, Briefcase, Users, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardOverviewProps {
  onViewJob: (jobId: number) => void
}

export function DashboardOverview({ onViewJob }: DashboardOverviewProps) {
  // Sample data for the dashboard
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      description: "3 jobs closing soon",
      icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Applicants",
      value: "248",
      description: "32 new this week",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Pending Reviews",
      value: "18",
      description: "5 require immediate attention",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  // Sample recent job postings
  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 24,
      posted: "2 days ago",
      status: "Active",
    },
    {
      id: 2,
      title: "UX Designer",
      applicants: 18,
      posted: "1 week ago",
      status: "Active",
    },
    {
      id: 3,
      title: "Backend Engineer",
      applicants: 32,
      posted: "3 days ago",
      status: "Active",
    },
  ]

  // Sample recent applicants
  const recentApplicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      applied: "Today",
      status: "New",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "UX Designer",
      applied: "Yesterday",
      status: "Reviewed",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Backend Engineer",
      applied: "2 days ago",
      status: "Shortlisted",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>Overview of your most recent job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{job.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{job.applicants} applicants</span>
                      <span>•</span>
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => onViewJob(job.id)}>
                    View
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => onViewJob(0)}>
              View All Jobs
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>Latest candidates who applied to your jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicants.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{applicant.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{applicant.position}</span>
                      <span>•</span>
                      <span>Applied {applicant.applied}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        applicant.status === "New"
                          ? "bg-blue-500"
                          : applicant.status === "Reviewed"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm">{applicant.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Applicants
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

