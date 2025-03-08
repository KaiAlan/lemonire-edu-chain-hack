"use client"

import { ArrowLeft, Mail, Phone, MapPin, Calendar, Download, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface CandidateDetailsProps {
  candidateId: number | null
  onBack: () => void
}

export function CandidateDetails({ candidateId, onBack }: CandidateDetailsProps) {
  // In a real app, you would fetch the candidate details based on the candidateId
  // For this example, we'll use mock data
  const candidate = {
    id: candidateId,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    applied: "March 16, 2023",
    status: "New",
    avatar: "/placeholder.svg?height=100&width=100",
    jobTitle: "Senior Frontend Developer",
    experience: "6 years",
    education: [
      {
        degree: "Master of Computer Science",
        school: "Stanford University",
        year: "2017 - 2019",
      },
      {
        degree: "Bachelor of Computer Science",
        school: "University of California, Berkeley",
        year: "2013 - 2017",
      },
    ],
    workHistory: [
      {
        title: "Frontend Developer",
        company: "Tech Innovations Inc.",
        duration: "2019 - Present",
        description:
          "Led the development of multiple web applications using React, TypeScript, and GraphQL. Improved performance by 40% through code optimization.",
      },
      {
        title: "Junior Developer",
        company: "WebSolutions Co.",
        duration: "2017 - 2019",
        description:
          "Developed and maintained client websites using JavaScript, HTML, and CSS. Collaborated with designers to implement responsive designs.",
      },
    ],
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "GraphQL", "Redux", "Jest", "Webpack", "Git"],
    coverLetter:
      "Dear Hiring Manager,\n\nI am writing to express my interest in the Senior Frontend Developer position at TechCorp. With over 6 years of experience in frontend development, I have a strong foundation in React, TypeScript, and modern JavaScript practices.\n\nIn my current role at Tech Innovations Inc., I have led the development of several successful web applications, improving performance and user experience. I am passionate about creating clean, efficient, and maintainable code.\n\nI am excited about the opportunity to bring my skills and experience to TechCorp and contribute to your innovative projects.\n\nThank you for considering my application.\n\nSincerely,\nSarah Johnson",
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 h-8 px-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Job Details
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>
                  {candidate.name.charAt(0)}
                  {candidate.name.split(" ")[1].charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{candidate.name}</CardTitle>
              <CardDescription>{candidate.jobTitle}</CardDescription>
              <Badge
                className="mt-2"
                variant={
                  candidate.status === "New"
                    ? "default"
                    : candidate.status === "Reviewed"
                      ? "secondary"
                      : candidate.status === "Shortlisted"
                        ? "outline"
                        : "secondary"
                }
              >
                {candidate.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Applied: {candidate.applied}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Experience: {candidate.experience}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">Download Resume</Button>
            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1">
                Reject
              </Button>
              <Button variant="outline" className="flex-1">
                Shortlist
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {candidate.workHistory.map((work, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{work.title}</h3>
                        <span className="text-sm text-muted-foreground">{work.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{work.company}</p>
                      <p className="text-sm">{work.description}</p>
                      {index < candidate.workHistory.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <span className="text-sm text-muted-foreground">{edu.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.school}</p>
                      {index < candidate.education.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cover-letter" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                  <CardDescription>Submitted with application on {candidate.applied}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line rounded-md border p-4">{candidate.coverLetter}</div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Cover Letter
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

