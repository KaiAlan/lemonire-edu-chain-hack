"use client"

import { ArrowLeft, Calendar, MapPin, Briefcase, Users, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobDetailsProps {
  jobId: number | null
  onViewCandidate: (candidateId: number) => void
  onBack: () => void
}

export function JobDetails({ jobId, onViewCandidate, onBack }: JobDetailsProps) {
  // In a real app, you would fetch the job details based on the jobId
  // For this example, we'll use mock data
  const job = {
    id: jobId,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "March 15, 2023",
    closing: "April 15, 2023",
    status: "Active",
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
    applicants: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        applied: "March 16, 2023",
        status: "New",
        experience: "6 years",
        location: "San Francisco, CA",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@example.com",
        applied: "March 17, 2023",
        status: "Reviewed",
        experience: "8 years",
        location: "Oakland, CA",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        applied: "March 18, 2023",
        status: "Shortlisted",
        experience: "7 years",
        location: "San Jose, CA",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 4,
        name: "David Kim",
        email: "david.kim@example.com",
        applied: "March 19, 2023",
        status: "Interviewed",
        experience: "5 years",
        location: "Remote",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 5,
        name: "Lisa Wang",
        email: "lisa.wang@example.com",
        applied: "March 20, 2023",
        status: "New",
        experience: "9 years",
        location: "San Francisco, CA",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 h-8 px-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              {job.department}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {job.location}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Posted: {job.posted}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={job.status === "Active" ? "default" : "outline"}>{job.status}</Badge>
          <Button variant="outline">Edit Job</Button>
          <Button>Manage Applicants</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Total Applicants
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{job.applicants.length}</div>
            <p className="text-xs text-muted-foreground">
              {job.applicants.filter((a) => a.status === "New").length} new applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Closing Date
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{job.closing}</div>
            <p className="text-xs text-muted-foreground">
              {job.status === "Active" ? "Currently accepting applications" : "Applications closed"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Job Type
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{job.type}</div>
            <p className="text-xs text-muted-foreground">{job.salary}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applicants">
        <TabsList>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="description">Job Description</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Applicants</CardTitle>
              <CardDescription>Manage and review candidates who applied for this position</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead className="hidden md:table-cell">Experience</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {job.applicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={applicant.avatar} alt={applicant.name} />
                            <AvatarFallback>
                              {applicant.name.charAt(0)}
                              {applicant.name.split(" ")[1].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{applicant.name}</div>
                            <div className="text-sm text-muted-foreground">{applicant.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{applicant.experience}</TableCell>
                      <TableCell className="hidden md:table-cell">{applicant.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{applicant.applied}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            applicant.status === "New"
                              ? "default"
                              : applicant.status === "Reviewed"
                                ? "secondary"
                                : applicant.status === "Shortlisted"
                                  ? "outline"
                                  : "secondary"
                          }
                        >
                          {applicant.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => onViewCandidate(applicant.id)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="description" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Details about the job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="mt-2 text-muted-foreground">{job.description}</p>
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
      </Tabs>
    </div>
  )
}

