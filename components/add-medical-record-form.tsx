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

interface AddMedicalRecordFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddRecord: (record: any) => void
  patientId?: string
}

export function AddMedicalRecordForm({ open, onOpenChange, onAddRecord, patientId }: AddMedicalRecordFormProps) {
  const [formData, setFormData] = useState({
    patientId: patientId || "",
    doctorId: "",
    diagnosis: "",
    symptoms: "",
    notes: "",
    attachments: "",
    date: new Date().toISOString().split("T")[0],
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

    // Create a new medical record object
    const newRecord = {
      id: `mr${Date.now()}`,
      patientId: formData.patientId,
      patientName: selectedPatient.name,
      doctorId: formData.doctorId,
      doctorName: selectedDoctor.name,
      date: formData.date,
      diagnosis: formData.diagnosis,
      symptoms: formData.symptoms.split(",").map((s) => s.trim()),
      notes: formData.notes,
      attachments: formData.attachments ? formData.attachments.split(",").map((a) => a.trim()) : [],
    }

    onAddRecord(newRecord)
    onOpenChange(false)

    // Reset form
    setFormData({
      patientId: patientId || "",
      doctorId: "",
      diagnosis: "",
      symptoms: "",
      notes: "",
      attachments: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Filter staff to only include physicians
  const doctors = mockStaffMembers.filter((staff) => staff.role === "Physician")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Medical Record</DialogTitle>
          <DialogDescription>Enter medical record details for the patient.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => handleSelectChange("patientId", value)}
                disabled={!!patientId}
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

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input id="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
              <Input
                id="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Headache, Fever, Fatigue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information about the diagnosis and treatment"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments (comma-separated)</Label>
              <Input
                id="attachments"
                value={formData.attachments}
                onChange={handleChange}
                placeholder="lab_results.pdf, xray.pdf"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Record</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

