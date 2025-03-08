"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Building, Clock, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface AppliedJobDetailProps {
  jobId: number
}

export function AppliedJobDetail({ jobId }: AppliedJobDetailProps) {
  const router = useRouter()

  // In a real app, you would fetch the job details based on the jobId
  // For this example, we'll use mock data
  const job = {
    id: jobId,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    appliedDate: "2023-03-15",
    status: "In Review",
    logo: "/placeholder.svg?height=40&width=40",
    hasTest: true,
    testStatus: "Pending",
    interviewDate: null,
    description:
      "We are looking for an experienced Frontend Developer to join our team. The ideal candidate should have strong experience with React, TypeScript, and modern frontend development practices.",
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with state management libraries (Redux, MobX, etc.)",
      "Knowledge of responsive design and cross-browser compatibility",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
    ],
    responsibilities: [
      "Develop and maintain frontend applications using React",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum speed and scalability",
      "Implement responsive design and ensure cross-browser compatibility",
      "Write clean, maintainable, and reusable code",
    ],
    applicationTimeline: [
      {
        date: "2023-03-15",
        event: "Application Submitted",
        description: "Your application was successfully submitted.",
        status: "completed",
      },
      {
        date: "2023-03-17",
        event: "Application Reviewed",
        description: "Your application was reviewed by the hiring team.",
        status: "completed",
      },
      {
        date: "2023-03-18",
        event: "Assessment Assigned",
        description: "You've been assigned a technical assessment.",
        status: "completed",
      },
      {
        date: "2023-03-20",
        event: "Assessment Completion",
        description: "Complete the technical assessment.",
        status: "current",
      },
      {
        date: null,
        event: "Interview",
        description: "Technical interview with the hiring team.",
        status: "upcoming",
      },
      {
        date: null,
        event: "Final Decision",
        description: "Final hiring decision.",
        status: "upcoming",
      },
    ],
    contactPerson: {
      name: "Alex Johnson",
      title: "Technical Recruiter",
      email: "alex.johnson@techcorp.com",
      phone: "+1 (555) 123-4567",
    },
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="container py-6">
            <Button variant="ghost" onClick={() => router.push("/applied-jobs")} className="mb-4 -ml-2 h-8 px-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applied Jobs
            </Button>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-md">
                  <img src={job.logo || "/placeholder.svg"} alt={job.company} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      {job.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Applied: {new Date(job.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant={
                  job.status === "Offer Received"
                    ? "default"
                    : job.status === "Rejected"
                      ? "destructive"
                      : job.status === "Interview Scheduled"
                        ? "outline"
                        : "secondary"
                }
                className="h-6 px-3 py-1"
              >
                {job.status}
              </Badge>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Job Details</TabsTrigger>
                    <TabsTrigger value="timeline">Application Timeline</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="mt-4 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Description</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <p className="text-muted-foreground">{job.description}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Requirements</h3>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Responsibilities</h3>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                            {job.responsibilities.map((resp, index) => (
                              <li key={index}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Application Timeline</CardTitle>
                        <CardDescription>Track the progress of your application</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative space-y-6 pl-8 pt-2 after:absolute after:bottom-0 after:left-4 after:top-2 after:w-[2px] after:bg-muted">
                          {job.applicationTimeline.map((item, index) => (
                            <div key={index} className="relative">
                              <div className="absolute -left-8 flex h-8 w-8 items-center justify-center">
                                {item.status === "completed" ? (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : item.status === "current" ? (
                                  <AlertCircle className="h-6 w-6 text-blue-500" />
                                ) : (
                                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{item.event}</h4>
                                  {item.date && (
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(item.date).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="contact" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Your point of contact for this application</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            {job.contactPerson.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h4 className="font-medium">{job.contactPerson.name}</h4>
                            <p className="text-sm text-muted-foreground">{job.contactPerson.title}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{job.contactPerson.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{job.contactPerson.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Send Message
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {job.applicationTimeline.filter((item) => item.status === "completed").length} of{" "}
                          {job.applicationTimeline.length} steps
                        </span>
                      </div>
                      <Progress
                        value={
                          (job.applicationTimeline.filter((item) => item.status === "completed").length /
                            job.applicationTimeline.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4" />
                        Next Step
                      </div>
                      <p className="mt-1 text-sm">
                        {job.applicationTimeline.find((item) => item.status === "current")?.description ||
                          "Waiting for the next step"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {job.hasTest && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="outline">{job.testStatus}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {job.testStatus === "Not Started"
                            ? "You have been assigned a technical assessment. Please complete it to proceed with your application."
                            : job.testStatus === "Pending"
                              ? "Your assessment is waiting to be reviewed by the hiring team."
                              : "Your assessment has been reviewed by the hiring team."}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {job.testStatus === "Not Started" ? (
                        <Button className="w-full" onClick={() => router.push(`/tests/${job.id}`)}>
                          Take Assessment
                        </Button>
                      ) : job.testStatus === "Pending" ? (
                        <Button variant="outline" className="w-full" disabled>
                          Waiting for Review
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" onClick={() => router.push(`/tests/${job.id}`)}>
                          View Results
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )}

                {job.interviewDate && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Interview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(job.interviewDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(job.interviewDate).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                      <Button className="flex-1">Join Meeting</Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

