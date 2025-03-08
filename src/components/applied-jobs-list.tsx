"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Calendar, MapPin, Briefcase, Clock, FileText, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample applied jobs data
const appliedJobs = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    salary: "$80,000 - $100,000",
    appliedDate: "2023-03-10",
    status: "Interview Scheduled",
    logo: "/placeholder.svg?height=40&width=40",
    hasTest: true,
    testStatus: "Completed",
    interviewDate: "2023-03-25",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    appliedDate: "2023-03-05",
    status: "Rejected",
    logo: "/placeholder.svg?height=40&width=40",
    hasTest: false,
    testStatus: null,
    interviewDate: null,
  },
  {
    id: 4,
    title: "Product Manager",
    company: "ProductLabs",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    appliedDate: "2023-03-18",
    status: "Application Sent",
    logo: "/placeholder.svg?height=40&width=40",
    hasTest: true,
    testStatus: "Not Started",
    interviewDate: null,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Part-time",
    salary: "$90,000 - $120,000",
    appliedDate: "2023-02-28",
    status: "Offer Received",
    logo: "/placeholder.svg?height=40&width=40",
    hasTest: true,
    testStatus: "Completed",
    interviewDate: "2023-03-15",
  },
]

interface AppliedJobsListProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    status: string
  }
  setFilters: (filters: any) => void
}

export function AppliedJobsList({ searchQuery, setSearchQuery, filters, setFilters }: AppliedJobsListProps) {
  const router = useRouter()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter jobs based on search query, filters, and active tab
  const filteredJobs = appliedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filters.status === "all" || job.status.toLowerCase() === filters.status.toLowerCase()

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && ["Application Sent", "In Review", "Interview Scheduled"].includes(job.status)) ||
      (activeTab === "completed" && ["Offer Received", "Rejected"].includes(job.status))

    return matchesSearch && matchesStatus && matchesTab
  })

  const handleViewJob = (jobId: number) => {
    router.push(`/applied-jobs/${jobId}`)
  }

  return (
    <div className="container py-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden md:block">
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="application sent">Application Sent</SelectItem>
                  <SelectItem value="in review">In Review</SelectItem>
                  <SelectItem value="interview scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="offer received">Offer Received</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter your job applications</SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="application sent">Application Sent</SelectItem>
                        <SelectItem value="in review">In Review</SelectItem>
                        <SelectItem value="interview scheduled">Interview Scheduled</SelectItem>
                        <SelectItem value="offer received">Offer Received</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mt-4" onClick={() => setIsMobileFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      

      <TabsContent value="all" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md">
                        <img
                          src={job.logo || "/placeholder.svg"}
                          alt={job.company}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
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
                    >
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job.type} • {job.salary}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      Applied on {new Date(job.appliedDate).toLocaleDateString()}
                    </div>
                    {job.hasTest && (
                      <div className="flex items-center text-sm">
                        <FileText className="mr-1 h-4 w-4" />
                        Assessment:{" "}
                        <Badge variant="outline" className="ml-1">
                          {job.testStatus}
                        </Badge>
                      </div>
                    )}
                    {job.interviewDate && (
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4" />
                        Interview: {new Date(job.interviewDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <Button size="sm" variant="outline" onClick={() => handleViewJob(job.id)}>
                    View Details
                  </Button>
                  {job.hasTest && job.testStatus === "Not Started" && (
                    <Button size="sm" onClick={() => router.push(`/tests/${job.id}`)}>
                      Take Assessment
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Building className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No applications found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="active" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.filter((job) => ["Application Sent", "In Review", "Interview Scheduled"].includes(job.status))
            .length > 0 ? (
            filteredJobs
              .filter((job) => ["Application Sent", "In Review", "Interview Scheduled"].includes(job.status))
              .map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <Badge variant={job.status === "Interview Scheduled" ? "outline" : "secondary"}>
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.type} • {job.salary}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Applied on {new Date(job.appliedDate).toLocaleDateString()}
                      </div>
                      {job.hasTest && (
                        <div className="flex items-center text-sm">
                          <FileText className="mr-1 h-4 w-4" />
                          Assessment:{" "}
                          <Badge variant="outline" className="ml-1">
                            {job.testStatus}
                          </Badge>
                        </div>
                      )}
                      {job.interviewDate && (
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-4 w-4" />
                          Interview: {new Date(job.interviewDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewJob(job.id)}>
                      View Details
                    </Button>
                    {job.hasTest && job.testStatus === "Not Started" && (
                      <Button size="sm" onClick={() => router.push(`/tests/${job.id}`)}>
                        Take Assessment
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Building className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No active applications found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="completed" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.filter((job) => ["Offer Received", "Rejected"].includes(job.status)).length > 0 ? (
            filteredJobs
              .filter((job) => ["Offer Received", "Rejected"].includes(job.status))
              .map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <Badge variant={job.status === "Offer Received" ? "default" : "destructive"}>{job.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.type} • {job.salary}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Applied on {new Date(job.appliedDate).toLocaleDateString()}
                      </div>
                      {job.hasTest && (
                        <div className="flex items-center text-sm">
                          <FileText className="mr-1 h-4 w-4" />
                          Assessment:{" "}
                          <Badge variant="outline" className="ml-1">
                            {job.testStatus}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <Button size="sm" variant="outline" onClick={() => handleViewJob(job.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Building className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No completed applications found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </TabsContent>
      </Tabs>
    </div>
  )
}

