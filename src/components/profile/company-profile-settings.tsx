"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function CompanyProfileSettings() {
  const { toast } = useToast()
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [notifications, setNotifications] = useState({
    applicationAlerts: true,
    messages: true,
    marketing: false,
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const updatePassword = () => {
    // Validate password
    if (password.new !== password.confirm) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    if (password.new.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would update the password on the server here
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    // Reset form
    setPassword({
      current: "",
      new: "",
      confirm: "",
    })
  }

  const saveNotificationSettings = () => {
    // In a real app, you would save the notification settings to the server here
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              name="current"
              type="password"
              value={password.current}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" name="new" type="password" value={password.new} onChange={handlePasswordChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={updatePassword}>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="application-alerts">Application Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about new job applications</p>
            </div>
            <Switch
              id="application-alerts"
              checked={notifications.applicationAlerts}
              onCheckedChange={(checked) => handleNotificationChange("applicationAlerts", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="messages">Messages</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about new messages</p>
            </div>
            <Switch
              id="messages"
              checked={notifications.messages}
              onCheckedChange={(checked) => handleNotificationChange("messages", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">Marketing</Label>
              <p className="text-sm text-muted-foreground">Receive marketing emails and newsletters</p>
            </div>
            <Switch
              id="marketing"
              checked={notifications.marketing}
              onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveNotificationSettings}>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>Manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your company account and all of your data. This action cannot be undone.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

