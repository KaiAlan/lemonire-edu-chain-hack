"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CreateJobFormProps {
  onSubmit: () => void
}

export function CreateJobForm({ onSubmit }: CreateJobFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    closingDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter the basic information about the job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $120,000 - $150,000"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closingDate">Closing Date</Label>
                  <Input
                    id="closingDate"
                    name="closingDate"
                    type="date"
                    value={formData.closingDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Provide detailed information about the job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Overview</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a brief overview of the job..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the requirements for this position (one per line)..."
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">Enter each requirement on a new line</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="List the responsibilities for this position (one per line)..."
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">Enter each responsibility on a new line</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Job Posting Preview</CardTitle>
              <CardDescription>Review your job posting before publishing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.title ? (
                <>
                  <div>
                    <h2 className="text-2xl font-bold">{formData.title}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      {formData.department && <span>{formData.department}</span>}
                      {formData.department && formData.location && <span>•</span>}
                      {formData.location && <span>{formData.location}</span>}
                      {(formData.department || formData.location) && formData.type && <span>•</span>}
                      {formData.type && <span>{formData.type}</span>}
                    </div>
                    {formData.salary && <div className="mt-2 text-sm font-medium">{formData.salary}</div>}
                  </div>

                  {formData.description && (
                    <div>
                      <h3 className="text-lg font-medium">Overview</h3>
                      <p className="mt-2 text-muted-foreground">{formData.description}</p>
                    </div>
                  )}

                  {formData.requirements && (
                    <div>
                      <h3 className="text-lg font-medium">Requirements</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                        {formData.requirements
                          .split("\n")
                          .filter(Boolean)
                          .map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {formData.responsibilities && (
                    <div>
                      <h3 className="text-lg font-medium">Responsibilities</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                        {formData.responsibilities
                          .split("\n")
                          .filter(Boolean)
                          .map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {formData.closingDate && (
                    <div className="rounded-md bg-muted p-4 text-sm">
                      <p>
                        Applications close on:{" "}
                        <strong>
                          {new Date(formData.closingDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </strong>
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-xl font-semibold">No preview available</h3>
                  <p className="text-muted-foreground">Fill out the job details to see a preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => onSubmit()}>
          Cancel
        </Button>
        <Button type="submit">Publish Job</Button>
      </div>
    </form>
  )
}

