"use client"

import { useState } from "react"
import { Search, Filter, Clock, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"

// Sample course data
const courses = [
  {
    id: 1,
    title: "Modern Frontend Development",
    provider: "TechAcademy",
    category: "Web Development",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: 1245,
    rating: 4.8,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    provider: "DataLearn",
    category: "Data Science",
    level: "Beginner",
    duration: "10 weeks",
    enrolled: 2130,
    rating: 4.6,
    progress: 35,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    provider: "ReactMasters",
    category: "Web Development",
    level: "Advanced",
    duration: "6 weeks",
    enrolled: 875,
    rating: 4.9,
    progress: 68,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    provider: "DesignSchool",
    category: "Design",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 1560,
    rating: 4.7,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Python for Machine Learning",
    provider: "AIAcademy",
    category: "Machine Learning",
    level: "Intermediate",
    duration: "14 weeks",
    enrolled: 3200,
    rating: 4.8,
    progress: 12,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Cloud Architecture with AWS",
    provider: "CloudMasters",
    category: "Cloud Computing",
    level: "Advanced",
    duration: "10 weeks",
    enrolled: 950,
    rating: 4.5,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
]

interface CourseListingsProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    category: string
    level: string
    duration: string
  }
  setFilters: (filters: any) => void
}

export function CourseListings({ searchQuery, setSearchQuery, filters, setFilters }: CourseListingsProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      filters.category === "all" || course.category.toLowerCase() === filters.category.toLowerCase()
    const matchesLevel = filters.level === "all" || course.level.toLowerCase() === filters.level.toLowerCase()
    const matchesDuration =
      filters.duration === "all" ||
      (filters.duration === "short" && Number.parseInt(course.duration) <= 6) ||
      (filters.duration === "medium" &&
        Number.parseInt(course.duration) > 6 &&
        Number.parseInt(course.duration) <= 10) ||
      (filters.duration === "long" && Number.parseInt(course.duration) > 10)

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration
  })

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="web development">Web Development</SelectItem>
              <SelectItem value="data science">Data Science</SelectItem>
              <SelectItem value="machine learning">Machine Learning</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="cloud computing">Cloud Computing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="short">Short (≤ 6 weeks)</SelectItem>
              <SelectItem value="medium">Medium (7-10 weeks)</SelectItem>
              <SelectItem value="long">Long (> 10 weeks)</SelectItem>
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
              <SheetDescription>Filter courses by category, level, and duration</SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="web development">Web Development</SelectItem>
                    <SelectItem value="data science">Data Science</SelectItem>
                    <SelectItem value="machine learning">Machine Learning</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="cloud computing">Cloud Computing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Level</label>
                <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Short (≤ 6 weeks)</SelectItem>
                    <SelectItem value="medium">Medium (7-10 weeks)</SelectItem>
                    <SelectItem value="long">Long (> 10 weeks)</SelectItem>
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
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge
                    className="absolute right-2 top-2"
                    variant={
                      course.level === "Beginner"
                        ? "outline"
                        : course.level === "Intermediate"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {course.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline">{course.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </div>
                </div>
                <h3 className="mb-1 font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.provider}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="mr-1 h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{course.rating}/5.0</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{course.enrolled.toLocaleString()} enrolled</div>
                </div>
                {course.progress > 0 && (
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
                  {course.progress > 0 ? "Continue Learning" : "Enroll Now"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <BookOpen className="mb-2 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

