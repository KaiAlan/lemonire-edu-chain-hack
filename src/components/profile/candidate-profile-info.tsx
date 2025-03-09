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
import { useToast } from "@/hooks/use-toast"

// Mock candidate data
const candidateData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  title: "Senior Frontend Developer",
  bio: "Experienced frontend developer with a passion for creating beautiful and functional user interfaces. Specialized in React, TypeScript, and modern JavaScript frameworks.",
  avatar: "/placeholder.svg?height=100&width=100",
}

export function CandidateProfileInfo() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(candidateData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save the data to the server here
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleCancel = () => {
    setFormData(candidateData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
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
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-2 border-background"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload avatar</span>
                </Button>
              )}
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{formData.name}</h3>
              <p className="text-muted-foreground">{formData.title}</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
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
              <Label htmlFor="location">Location</Label>
              {isEditing ? (
                <Input id="location" name="location" value={formData.location} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.location}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Professional Title</Label>
              {isEditing ? (
                <Input id="title" name="title" value={formData.title} onChange={handleChange} />
              ) : (
                <p className="rounded-md border px-3 py-2">{formData.title}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                />
              ) : (
                <p className="rounded-md border px-3 py-2 min-h-[100px]">{formData.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

