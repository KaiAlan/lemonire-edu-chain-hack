"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"

// Sample tests data
const tests = [
  {
    id: 1,
    title: "Frontend Development Assessment",
    company: "TechCorp",
    jobTitle: "Senior Frontend Developer",
    dueDate: "2023-03-25",
    duration: "60 minutes",
    questions: 15,
    status: "Not Started",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "UX Design Challenge",
    company: "DesignHub",
    jobTitle: "UX Designer",
    dueDate: "2023-03-20",
    duration: "90 minutes",
    questions: 5,
    status: "Completed",
    score: 85,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Backend Development Test",
    company: "DataSystems",
    jobTitle: "Backend Engineer",
    dueDate: "2023-03-15",
    duration: "75 minutes",
    questions: 12,
    status: "Expired",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Product Management Case Study",
    company: "ProductLabs",
    jobTitle: "Product Manager",
    dueDate: "2023-03-30",
    duration: "120 minutes",
    questions: 8,
    status: "In Progress",
    progress: 25,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "DevOps Technical Assessment",
    company: "CloudTech",
    jobTitle: "DevOps Engineer",
    dueDate: "2023-03-18",
    duration: "90 minutes",
    questions: 10,
    status: "Completed",
    score: 92,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

interface TestsListProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    status: string
  }
  setFilters: (filters: any) => void
}

export function TestsList({ searchQuery, setSearchQuery, filters, setFilters }: TestsListProps) {
  const router = useRouter()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter tests based on search query and filters
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filters.status === "all" || test.status.toLowerCase() === filters.status.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleStartTest = (testId: number) => {
    router.push(`/tests/${testId}`)
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="not started">Not Started</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
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
                <SheetDescription>Filter your assessments</SheetDescription>
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
                      <SelectItem value="not started">Not Started</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <Card key={test.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-md">
                      <img
                        src={test.logo || "/placeholder.svg"}
                        alt={test.company}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {test.company} • {test.jobTitle}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      test.status === "Completed"
                        ? "default"
                        : test.status === "Expired"
                          ? "destructive"
                          : test.status === "In Progress"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {test.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Due: {new Date(test.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    Duration: {test.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {test.questions} questions
                  </div>
                  {test.status === "Completed" && (
                    <div className="mt-2 flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Score: {test.score}%</p>
                      </div>
                    </div>
                  )}
                  {test.status === "In Progress" && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{test.progress}%</span>
                      </div>
                      <Progress value={test.progress} className="h-2" />
                    </div>
                  )}
                  {test.status === "Expired" && (
                    <div className="mt-2 flex items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700">
                        <XCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Deadline passed</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button
                  className="w-full"
                  variant={test.status === "Not Started" || test.status === "In Progress" ? "default" : "outline"}
                  disabled={test.status === "Expired"}
                  onClick={() => handleStartTest(test.id)}
                >
                  {test.status === "Not Started"
                    ? "Start Assessment"
                    : test.status === "In Progress"
                      ? "Continue Assessment"
                      : test.status === "Completed"
                        ? "View Results"
                        : "Expired"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <AlertCircle className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No assessments found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

