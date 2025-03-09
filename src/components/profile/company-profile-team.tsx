"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Pencil, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock team data
const teamData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@techcorp.com",
    role: "Technical Recruiter",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@techcorp.com",
    role: "HR Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@techcorp.com",
    role: "Hiring Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CompanyProfileTeam() {
  const { toast } = useToast()
  const [team, setTeam] = useState(teamData)
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null)
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    role: "",
  })

  const handleMemberFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMemberForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setMemberForm((prev) => ({ ...prev, role: value }))
  }

  const addTeamMember = () => {
    setMemberForm({
      name: "",
      email: "",
      role: "",
    })
    setIsAddingMember(true)
    setEditingMemberId(null)
  }

  const editTeamMember = (id: number) => {
    const member = team.find((m) => m.id === id)
    if (member) {
      setMemberForm({
        name: member.name,
        email: member.email,
        role: member.role,
      })
      setIsAddingMember(true)
      setEditingMemberId(id)
    }
  }

  const saveMember = () => {
    // Validate form
    if (!memberForm.name || !memberForm.email || !memberForm.role) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    if (editingMemberId) {
      // Update existing member
      setTeam((prev) =>
        prev.map((member) =>
          member.id === editingMemberId
            ? {
                ...member,
                name: memberForm.name,
                email: memberForm.email,
                role: memberForm.role,
              }
            : member,
        ),
      )
      toast({
        title: "Team member updated",
        description: `${memberForm.name}'s information has been updated.`,
      })
    } else {
      // Add new member
      const newId = Math.max(0, ...team.map((member) => member.id)) + 1
      setTeam((prev) => [
        ...prev,
        {
          id: newId,
          name: memberForm.name,
          email: memberForm.email,
          role: memberForm.role,
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])
      toast({
        title: "Team member added",
        description: `${memberForm.name} has been added to your team.`,
      })
    }

    setIsAddingMember(false)
    setEditingMemberId(null)
  }

  const cancelAddEdit = () => {
    setIsAddingMember(false)
    setEditingMemberId(null)
  }

  const removeMember = (id: number) => {
    const memberToRemove = team.find((m) => m.id === id)
    setTeam((prev) => prev.filter((member) => member.id !== id))
    toast({
      title: "Team member removed",
      description: `${memberToRemove?.name} has been removed from your team.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your company's team members</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addTeamMember}>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingMember ? (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={memberForm.name}
                    onChange={handleMemberFormChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={memberForm.email}
                    onChange={handleMemberFormChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={memberForm.role} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical Recruiter">Technical Recruiter</SelectItem>
                      <SelectItem value="HR Manager">HR Manager</SelectItem>
                      <SelectItem value="Hiring Manager">Hiring Manager</SelectItem>
                      <SelectItem value="Talent Acquisition Specialist">Talent Acquisition Specialist</SelectItem>
                      <SelectItem value="Recruitment Coordinator">Recruitment Coordinator</SelectItem>
                      <SelectItem value="HR Director">HR Director</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={cancelAddEdit}>
                  Cancel
                </Button>
                <Button onClick={saveMember}>Save</Button>
              </div>
            </div>
          ) : team.length > 0 ? (
            <div className="space-y-4">
              {team.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <p className="text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => editTeamMember(member.id)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">No team members added yet</p>
              <Button variant="link" onClick={addTeamMember} className="mt-2">
                Add your first team member
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

