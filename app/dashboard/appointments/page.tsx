"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { mockAppointments } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddAppointmentForm } from "@/components/add-appointment-form"
import type { Appointment } from "@/lib/types"

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all")
  const [appointments, setAppointments] = useState(mockAppointments)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter appointments based on selected filter
  const filteredAppointments =
    filter === "all" ? appointments : appointments.filter((appointment) => appointment.status === filter)

  // Count appointments by status
  const scheduledCount = appointments.filter((a) => a.status === "scheduled").length
  const pendingCount = appointments.filter((a) => a.status === "no-show").length
  const cancelledCount = appointments.filter((a) => a.status === "cancelled").length

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment])
  }

  const handleReschedule = (id: string) => {
    alert(`Reschedule appointment ID: ${id}`)
  }

  const handleCancel = (id: string) => {
    // Update the appointment status to cancelled
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
      ),
    )
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome 👋</h1>
            <p className="text-muted-foreground">Start the day with managing new appointments</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-3">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{scheduledCount}</p>
                <p className="text-sm text-muted-foreground">Scheduled appointments</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-full bg-blue-500/20 p-3">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending appointments</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-full bg-red-500/20 p-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-3xl font-bold">{cancelledCount}</p>
                <p className="text-sm text-muted-foreground">Cancelled appointments</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Select value={filter} onValueChange={setFilter} className="w-[180px]">
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Appointments</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no-show">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-zinc-800">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No appointments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appointment, index) => (
                  <TableRow key={appointment.id} className="border-zinc-800">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.patientName}</div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          appointment.status === "scheduled"
                            ? "px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400"
                            : appointment.status === "no-show"
                              ? "px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400"
                              : appointment.status === "cancelled"
                                ? "px-2 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400"
                                : "px-2 py-1 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400"
                        }
                      >
                        {appointment.status === "no-show"
                          ? "Pending"
                          : appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.date}</div>
                      <div className="text-xs text-muted-foreground">{appointment.time} AM</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
                          {appointment.doctorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span>{appointment.doctorName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary/20 hover:bg-primary/10"
                        onClick={() => handleReschedule(appointment.id)}
                      >
                        Schedule
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddAppointmentForm open={showAddForm} onOpenChange={setShowAddForm} onAddAppointment={handleAddAppointment} />
    </div>
  )
}

