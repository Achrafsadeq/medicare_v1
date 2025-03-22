"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { mockPatients, mockStaffMembers } from "@/lib/mock-data"

interface AddAppointmentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddAppointment: (appointment: any) => void
}

export function AddAppointmentForm({ open, onOpenChange, onAddAppointment }: AddAppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    duration: "30",
    type: "check-up",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Find the selected patient and doctor to get their names
    const selectedPatient = mockPatients.find((p) => p.id === formData.patientId)
    const selectedDoctor = mockStaffMembers.find((s) => s.id === formData.doctorId && s.role === "Physician")

    if (!selectedPatient || !selectedDoctor) {
      alert("Please select a valid patient and doctor")
      return
    }

    // Create a new appointment object
    const newAppointment = {
      id: `a${Date.now()}`,
      patientId: formData.patientId,
      patientName: selectedPatient.name,
      doctorId: formData.doctorId,
      doctorName: selectedDoctor.name,
      date: formData.date,
      time: formData.time,
      duration: Number.parseInt(formData.duration),
      status: "scheduled",
      type: formData.type,
      notes: formData.notes,
    }

    onAddAppointment(newAppointment)
    onOpenChange(false)

    // Reset form
    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      duration: "30",
      type: "check-up",
      notes: "",
    })
  }

  // Filter staff to only include physicians
  const doctors = mockStaffMembers.filter((staff) => staff.role === "Physician")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>Enter appointment details to schedule a new appointment.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => handleSelectChange("patientId", value)}
                required
              >
                <SelectTrigger id="patientId">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorId">Doctor</Label>
              <Select
                value={formData.doctorId}
                onValueChange={(value) => handleSelectChange("doctorId", value)}
                required
              >
                <SelectTrigger id="doctorId">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="check-up">Check-up</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information about the appointment"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Schedule Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

