"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Pencil, Save, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock company data
const companyData = {
  name: "TechCorp",
  email: "info@techcorp.com",
  phone: "+1 (555) 987-6543",
  website: "https://techcorp.com",
  location: "San Francisco, CA",
  industry: "Technology",
  size: "501-1000",
  founded: "2010",
  description:
    "TechCorp is a leading technology company specializing in innovative software solutions. We are dedicated to creating cutting-edge products that solve real-world problems.",
  logo: "/placeholder.svg?height=100&width=100",
}

export function CompanyProfileInfo() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(companyData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save the data to the server here
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your company profile has been updated successfully.",
    })
  }

  const handleCancel = () => {
    setFormData(companyData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.logo} alt={formData.name} />
                <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-2 border-background"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload logo</span>
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{formData.name}</h3>
              <p className="text-muted-foreground">{formData.industry}</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              {isEditing ? (
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              {isEditing ? (
                <Input id="website" name="website" value={formData.website} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.website}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              {isEditing ? (
                <Input id="location" name="location" value={formData.location} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.location}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              {isEditing ? (
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.industry}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Company Size</Label>
              {isEditing ? (
                <Select value={formData.size} onValueChange={(value) => handleSelectChange("size", value)}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1001-5000">1001-5000 employees</SelectItem>
                    <SelectItem value="5001+">5001+ employees</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.size} employees</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded">Founded Year</Label>
              {isEditing ? (
                <Input id="founded" name="founded" value={formData.founded} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.founded}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Company Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                />
              ) : (
                <p className="rounded-md border px-3 py-2 min-h-[100px]">{formData.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

