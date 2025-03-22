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
import { mockPatients } from "@/lib/mock-data"

interface AddInsuranceClaimFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddClaim: (claim: any) => void
}

export function AddInsuranceClaimForm({ open, onOpenChange, onAddClaim }: AddInsuranceClaimFormProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    insuranceProvider: "",
    policyNumber: "",
    serviceDate: new Date().toISOString().split("T")[0],
    amount: "",
    status: "submitted",
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

    // Find the selected patient to get their name
    const selectedPatient = mockPatients.find((p) => p.id === formData.patientId)

    if (!selectedPatient) {
      alert("Please select a valid patient")
      return
    }

    // Create a new insurance claim object
    const newClaim = {
      id: `ic${Date.now()}`,
      patientId: formData.patientId,
      patientName: selectedPatient.name,
      insuranceProvider: formData.insuranceProvider,
      policyNumber: formData.policyNumber,
      serviceDate: formData.serviceDate,
      claimDate: new Date().toISOString().split("T")[0],
      amount: Number.parseFloat(formData.amount),
      status: formData.status,
      notes: formData.notes,
    }

    onAddClaim(newClaim)
    onOpenChange(false)

    // Reset form
    setFormData({
      patientId: "",
      insuranceProvider: "",
      policyNumber: "",
      serviceDate: new Date().toISOString().split("T")[0],
      amount: "",
      status: "submitted",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Insurance Claim</DialogTitle>
          <DialogDescription>Enter the details of the new insurance claim.</DialogDescription>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input id="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input id="policyNumber" value={formData.policyNumber} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceDate">Service Date</Label>
                <Input id="serviceDate" type="date" value={formData.serviceDate} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information about the claim"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Claim</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

