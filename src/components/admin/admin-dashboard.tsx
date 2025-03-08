"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { JobListings } from "@/components/admin/job-listings"
import { CandidateDetails } from "@/components/admin/candidate-details"
import { JobDetails } from "@/components/admin/job-details"
import { CreateJobForm } from "@/components/admin/create-job-form"
import { SidebarProvider } from "@/components/ui/sidebar"

type View = "overview" | "jobs" | "job-details" | "candidate-details" | "create-job"

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<View>("overview")
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null)

  const handleViewJob = (jobId: number) => {
    setSelectedJobId(jobId)
    setCurrentView("job-details")
  }

  const handleViewCandidate = (candidateId: number) => {
    setSelectedCandidateId(candidateId)
    setCurrentView("candidate-details")
  }

  const handleCreateJob = () => {
    setCurrentView("create-job")
  }

  const handleViewJobs = () => {
    setCurrentView("jobs")
  }

  const handleViewDashboard = () => {
    setCurrentView("overview")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar
          onDashboardClick={handleViewDashboard}
          onJobsClick={handleViewJobs}
          onCreateJobClick={handleCreateJob}
          currentView={currentView}
        />
        <main className="flex-1">
          <div className="flex flex-col">
            <div className="border-b">
              <div className="container py-6">
                <h1 className="text-3xl font-bold tracking-tight">
                  {currentView === "overview" && "Company Dashboard"}
                  {currentView === "jobs" && "Listed Jobs"}
                  {currentView === "job-details" && "Job Details"}
                  {currentView === "candidate-details" && "Candidate Profile"}
                  {currentView === "create-job" && "Create New Job"}
                </h1>
                <p className="text-muted-foreground">
                  {currentView === "overview" && "Manage your job listings and applicants"}
                  {currentView === "jobs" && "View and manage all your job postings"}
                  {currentView === "job-details" && "View detailed information about this job"}
                  {currentView === "candidate-details" && "Review candidate application"}
                  {currentView === "create-job" && "Post a new job listing"}
                </p>
              </div>
            </div>
            <div className="container py-6">
              {currentView === "overview" && <DashboardOverview onViewJob={handleViewJob} />}
              {currentView === "jobs" && <JobListings onViewJob={handleViewJob} />}
              {currentView === "job-details" && (
                <JobDetails
                  jobId={selectedJobId}
                  onViewCandidate={handleViewCandidate}
                  onBack={() => setCurrentView("jobs")}
                />
              )}
              {currentView === "candidate-details" && (
                <CandidateDetails candidateId={selectedCandidateId} onBack={() => setCurrentView("job-details")} />
              )}
              {currentView === "create-job" && <CreateJobForm onSubmit={() => setCurrentView("jobs")} />}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

