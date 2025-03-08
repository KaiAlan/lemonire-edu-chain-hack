"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Senior",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Contract",
    salary: "$80,000 - $100,000",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Mid-level",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    posted: "3 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Senior",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "ProductLabs",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "Just now",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Mid-level",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Part-time",
    salary: "$90,000 - $120,000",
    posted: "5 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Junior",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $170,000",
    posted: "1 day ago",
    logo: "/placeholder.svg?height=40&width=40",
    experience: "Senior",
  },
]

interface JobListingsProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    jobType: string
    location: string
    experience: string
  }
  setFilters: (filters: any) => void
}

export function JobListings({ searchQuery, setSearchQuery, filters, setFilters }: JobListingsProps) {
  const router = useRouter()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter jobs based on search query and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesJobType = filters.jobType === "all" || job.type.toLowerCase() === filters.jobType.toLowerCase()
    const matchesLocation =
      filters.location === "all" || job.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesExperience =
      filters.experience === "all" || job.experience.toLowerCase() === filters.experience.toLowerCase()

    return matchesSearch && matchesJobType && matchesLocation && matchesExperience
  })

  const handleViewJob = (jobId: number) => {
    router.push(`/job/${jobId}`)
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Select value={filters.jobType} onValueChange={(value) => setFilters({ ...filters, jobType: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
              <SelectItem value="seattle">Seattle</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.experience} onValueChange={(value) => setFilters({ ...filters, experience: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="mid-level">Mid-level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
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
              <SheetDescription>Narrow down job listings with filters</SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Type</label>
                <Select value={filters.jobType} onValueChange={(value) => setFilters({ ...filters, jobType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="san francisco">San Francisco</SelectItem>
                    <SelectItem value="new york">New York</SelectItem>
                    <SelectItem value="austin">Austin</SelectItem>
                    <SelectItem value="seattle">Seattle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience</label>
                <Select
                  value={filters.experience}
                  onValueChange={(value) => setFilters({ ...filters, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid-level">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
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
                  <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
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
                    {job.experience} • {job.salary}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                <Button size="sm" onClick={() => handleViewJob(job.id)}>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <h3 className="text-xl font-semibold">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

