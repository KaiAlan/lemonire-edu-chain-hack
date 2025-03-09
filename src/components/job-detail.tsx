"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Briefcase, Building, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface JobDetailProps {
  jobId: number
}

export function JobDetail({ jobId }: JobDetailProps) {
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
    posted: "2 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Senior",
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
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "401(k) matching",
      "Generous vacation policy",
    ],
    hasAssessment: true,
    assessmentDetails: {
      id: jobId, // Using the same ID for simplicity
      title: "Frontend Development Assessment",
      duration: "60 minutes",
      questions: 15,
    },
    companyDetails: {
      name: "TechCorp",
      description:
        "TechCorp is a leading technology company specializing in innovative software solutions. We are dedicated to creating cutting-edge products that solve real-world problems.",
      industry: "Technology",
      size: "501-1000 employees",
      founded: "2010",
      website: "https://techcorp.example.com",
    },
  }

  const handleApply = () => {
    // If the job has an assessment, redirect to the test page
    if (job.hasAssessment) {
      router.push(`/tests/${job.assessmentDetails.id}`)
    } else {
      // Otherwise, just redirect to the applied jobs page
      router.push(`/applied-jobs`)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="container py-6">
            <Button variant="ghost" onClick={() => router.push("/")} className="mb-4 -ml-2 h-8 px-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Listings
            </Button>

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-md">
                  <img src={job.logo || "/placeholder.svg"} alt={job.company} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job.type}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Posted {job.posted}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Save Job</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Job Saved</DialogTitle>
                      <DialogDescription>
                        This job has been saved to your profile. You can view all saved jobs in your dashboard.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => router.push("/")}>
                        View More Jobs
                      </Button>
                      <Button onClick={() => router.push("/saved-jobs")}>View Saved Jobs</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button onClick={handleApply}>{job.hasAssessment ? "Apply & Take Assessment" : "Apply Now"}</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Job Description</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    {job.hasAssessment && <TabsTrigger value="assessment">Assessment</TabsTrigger>}
                  </TabsList>
                  <TabsContent value="description" className="mt-4 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{job.description}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Requirements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Responsibilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                          {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="company" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{job.companyDetails.name}</CardTitle>
                        <CardDescription>Company Information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{job.companyDetails.description}</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h3 className="font-medium">Industry</h3>
                            <p className="text-muted-foreground">{job.companyDetails.industry}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Company Size</h3>
                            <p className="text-muted-foreground">{job.companyDetails.size}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Founded</h3>
                            <p className="text-muted-foreground">{job.companyDetails.founded}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Website</h3>
                            <a
                              href={job.companyDetails.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {job.companyDetails.website.replace("https://", "")}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  {job.hasAssessment && (
                    <TabsContent value="assessment" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Technical Assessment</CardTitle>
                          <CardDescription>
                            This job requires completing a technical assessment as part of the application process.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="rounded-md bg-muted p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{job.assessmentDetails.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {job.assessmentDetails.duration} • {job.assessmentDetails.questions} questions
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-medium">What to expect</h3>
                            <p className="text-sm text-muted-foreground">
                              The assessment will test your knowledge of frontend development concepts, including React,
                              JavaScript, CSS, and responsive design. You'll have {job.assessmentDetails.duration} to
                              complete {job.assessmentDetails.questions} questions.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-medium">Tips for success</h3>
                            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                              <li>Make sure you have a stable internet connection</li>
                              <li>Find a quiet place where you can focus</li>
                              <li>Read each question carefully before answering</li>
                              <li>Manage your time wisely</li>
                              <li>Review your answers before submitting</li>
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={handleApply}>
                            Apply & Take Assessment Now
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  )}
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Job Type</h3>
                      <p>{job.type}</p>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Experience Level</h3>
                      <p>{job.experience}</p>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Salary Range</h3>
                      <p>{job.salary}</p>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p>{job.location}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-inside list-decimal space-y-3 text-sm">
                      <li>
                        <span className="font-medium">Apply</span>
                        <p className="mt-1 text-muted-foreground">Submit your application with your resume</p>
                      </li>
                      {job.hasAssessment && (
                        <li>
                          <span className="font-medium">Technical Assessment</span>
                          <p className="mt-1 text-muted-foreground">
                            Complete a {job.assessmentDetails.duration} technical assessment
                          </p>
                        </li>
                      )}
                      <li>
                        <span className="font-medium">Initial Interview</span>
                        <p className="mt-1 text-muted-foreground">Phone or video interview with a recruiter</p>
                      </li>
                      <li>
                        <span className="font-medium">Technical Interview</span>
                        <p className="mt-1 text-muted-foreground">In-depth technical discussion with the team</p>
                      </li>
                      <li>
                        <span className="font-medium">Final Decision</span>
                        <p className="mt-1 text-muted-foreground">Receive an offer or feedback</p>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Button className="w-full" onClick={handleApply}>
                  {job.hasAssessment ? "Apply & Take Assessment" : "Apply Now"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

