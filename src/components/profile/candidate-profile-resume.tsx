"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Pencil, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock resume data
const resumeData = {
  education: [
    {
      id: 1,
      degree: "Master of Computer Science",
      school: "Stanford University",
      year: "2017 - 2019",
      description: "Specialized in Human-Computer Interaction and Web Technologies.",
    },
    {
      id: 2,
      degree: "Bachelor of Computer Science",
      school: "University of California, Berkeley",
      year: "2013 - 2017",
      description: "Graduated with honors. Participated in various hackathons and coding competitions.",
    },
  ],
  experience: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      duration: "2019 - Present",
      description:
        "Led the development of multiple web applications using React, TypeScript, and GraphQL. Improved performance by 40% through code optimization.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "WebSolutions Co.",
      location: "San Francisco, CA",
      duration: "2017 - 2019",
      description:
        "Developed and maintained client websites using JavaScript, HTML, and CSS. Collaborated with designers to implement responsive designs.",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "GraphQL",
    "Redux",
    "Jest",
    "Webpack",
    "Git",
    "Node.js",
    "Express",
  ],
}

export function CandidateProfileResume() {
  const { toast } = useToast()
  const [resume, setResume] = useState(resumeData)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editingItemId, setEditingItemId] = useState<number | null>(null)
  const [newSkill, setNewSkill] = useState("")

  // Education form state
  const [educationForm, setEducationForm] = useState({
    degree: "",
    school: "",
    year: "",
    description: "",
  })

  // Experience form state
  const [experienceForm, setExperienceForm] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    description: "",
  })

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEducationForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setExperienceForm((prev) => ({ ...prev, [name]: value }))
  }

  const startEditingEducation = (id: number) => {
    const item = resume.education.find((edu) => edu.id === id)
    if (item) {
      setEducationForm({
        degree: item.degree,
        school: item.school,
        year: item.year,
        description: item.description,
      })
      setEditingSection("education")
      setEditingItemId(id)
    }
  }

  const startEditingExperience = (id: number) => {
    const item = resume.experience.find((exp) => exp.id === id)
    if (item) {
      setExperienceForm({
        title: item.title,
        company: item.company,
        location: item.location,
        duration: item.duration,
        description: item.description,
      })
      setEditingSection("experience")
      setEditingItemId(id)
    }
  }

  const addEducation = () => {
    setEducationForm({
      degree: "",
      school: "",
      year: "",
      description: "",
    })
    setEditingSection("education")
    setEditingItemId(null)
  }

  const addExperience = () => {
    setExperienceForm({
      title: "",
      company: "",
      location: "",
      duration: "",
      description: "",
    })
    setEditingSection("experience")
    setEditingItemId(null)
  }

  const saveEducation = () => {
    if (editingItemId) {
      // Update existing education
      setResume((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === editingItemId
            ? {
                ...edu,
                degree: educationForm.degree,
                school: educationForm.school,
                year: educationForm.year,
                description: educationForm.description,
              }
            : edu,
        ),
      }))
    } else {
      // Add new education
      const newId = Math.max(0, ...resume.education.map((edu) => edu.id)) + 1
      setResume((prev) => ({
        ...prev,
        education: [
          ...prev.education,
          {
            id: newId,
            degree: educationForm.degree,
            school: educationForm.school,
            year: educationForm.year,
            description: educationForm.description,
          },
        ],
      }))
    }
    setEditingSection(null)
    setEditingItemId(null)
    toast({
      title: "Resume updated",
      description: "Your education information has been updated successfully.",
    })
  }

  const saveExperience = () => {
    if (editingItemId) {
      // Update existing experience
      setResume((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === editingItemId
            ? {
                ...exp,
                title: experienceForm.title,
                company: experienceForm.company,
                location: experienceForm.location,
                duration: experienceForm.duration,
                description: experienceForm.description,
              }
            : exp,
        ),
      }))
    } else {
      // Add new experience
      const newId = Math.max(0, ...resume.experience.map((exp) => exp.id)) + 1
      setResume((prev) => ({
        ...prev,
        experience: [
          ...prev.experience,
          {
            id: newId,
            title: experienceForm.title,
            company: experienceForm.company,
            location: experienceForm.location,
            duration: experienceForm.duration,
            description: experienceForm.description,
          },
        ],
      }))
    }
    setEditingSection(null)
    setEditingItemId(null)
    toast({
      title: "Resume updated",
      description: "Your experience information has been updated successfully.",
    })
  }

  const deleteEducation = (id: number) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
    toast({
      title: "Education removed",
      description: "The education entry has been removed from your resume.",
    })
  }

  const deleteExperience = (id: number) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
    toast({
      title: "Experience removed",
      description: "The experience entry has been removed from your resume.",
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      setResume((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
      toast({
        title: "Skill added",
        description: `"${newSkill.trim()}" has been added to your skills.`,
      })
    }
  }

  const removeSkill = (skill: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
    toast({
      title: "Skill removed",
      description: `"${skill}" has been removed from your skills.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Education Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your educational background</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addEducation}>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {editingSection === "education" ? (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={educationForm.degree}
                    onChange={handleEducationChange}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    name="school"
                    value={educationForm.school}
                    onChange={handleEducationChange}
                    placeholder="e.g. Stanford University"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={educationForm.year}
                    onChange={handleEducationChange}
                    placeholder="e.g. 2015 - 2019"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={educationForm.description}
                    onChange={handleEducationChange}
                    placeholder="Describe your studies, achievements, etc."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingSection(null)}>
                  Cancel
                </Button>
                <Button onClick={saveEducation}>Save</Button>
              </div>
            </div>
          ) : resume.education.length > 0 ? (
            resume.education.map((education, index) => (
              <div key={education.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{education.degree}</h3>
                    <p className="text-sm text-muted-foreground">{education.school}</p>
                    <p className="text-sm text-muted-foreground">{education.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditingEducation(education.id)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteEducation(education.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{education.description}</p>
                {index < resume.education.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">No education entries yet</p>
              <Button variant="link" onClick={addEducation} className="mt-2">
                Add your first education
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your professional experience</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addExperience}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {editingSection === "experience" ? (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={experienceForm.title}
                    onChange={handleExperienceChange}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={experienceForm.company}
                    onChange={handleExperienceChange}
                    placeholder="e.g. Tech Innovations Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={experienceForm.location}
                    onChange={handleExperienceChange}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={experienceForm.duration}
                    onChange={handleExperienceChange}
                    placeholder="e.g. 2019 - Present"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="exp-description">Description</Label>
                  <Textarea
                    id="exp-description"
                    name="description"
                    value={experienceForm.description}
                    onChange={handleExperienceChange}
                    placeholder="Describe your responsibilities and achievements"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingSection(null)}>
                  Cancel
                </Button>
                <Button onClick={saveExperience}>Save</Button>
              </div>
            </div>
          ) : resume.experience.length > 0 ? (
            resume.experience.map((experience, index) => (
              <div key={experience.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.company} • {experience.location}
                    </p>
                    <p className="text-sm text-muted-foreground">{experience.duration}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditingExperience(experience.id)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteExperience(experience.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm">{experience.description}</p>
                {index < resume.experience.length - 1 && <Separator className="my-4" />}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">No experience entries yet</p>
              <Button variant="link" onClick={addExperience} className="mt-2">
                Add your first experience
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your technical and professional skills</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill}</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g. React, Project Management)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill()
                  }
                }}
              />
              <Button variant="outline" onClick={addSkill}>
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Upload */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resume Document</CardTitle>
              <CardDescription>Upload your resume document</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
            <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Upload your resume</h3>
            <p className="mb-4 text-sm text-muted-foreground">Drag and drop your resume file here or click to browse</p>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">Supported formats: PDF, DOCX, RTF (Max 5MB)</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

