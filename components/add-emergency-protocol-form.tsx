"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddEmergencyProtocolFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProtocol: (protocol: any) => void
}

export function AddEmergencyProtocolForm({ open, onOpenChange, onAddProtocol }: AddEmergencyProtocolFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
    responsibleStaff: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new emergency protocol object
    const newProtocol = {
      id: `ep${Date.now()}`,
      title: formData.title,
      description: formData.description,
      steps: formData.steps.split("\n").filter((step) => step.trim() !== ""),
      lastUpdated: new Date().toISOString().split("T")[0],
      responsibleStaff: formData.responsibleStaff.split(",").map((staff) => staff.trim()),
    }

    onAddProtocol(newProtocol)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      description: "",
      steps: "",
      responsibleStaff: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Emergency Protocol</DialogTitle>
          <DialogDescription>Create a new emergency protocol for staff to follow.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps">Steps (one per line)</Label>
              <Textarea
                id="steps"
                value={formData.steps}
                onChange={handleChange}
                placeholder="1. Call for help and activate Code Blue
2. Begin CPR immediately
3. Retrieve and apply AED/defibrillator"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibleStaff">Responsible Staff (comma-separated)</Label>
              <Input
                id="responsibleStaff"
                value={formData.responsibleStaff}
                onChange={handleChange}
                placeholder="All clinical staff, Emergency Department Staff"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Protocol</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

