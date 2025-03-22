"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStaffMembers } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddStaffForm } from "@/components/add-staff-form"
import type { StaffMember } from "@/lib/types"

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [staffMembers, setStaffMembers] = useState(mockStaffMembers)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter staff based on search query
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddStaff = (newStaff: StaffMember) => {
    setStaffMembers((prevStaff) => [...prevStaff, newStaff])
    setShowAddForm(false)
  }

  const handleViewStaff = (id: string) => {
    alert(`View staff details for ID: ${id}`)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-white">Staff</h1>
      <p className="text-muted-foreground">Manage healthcare staff and personnel.</p>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search staff..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>View and manage staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No staff members found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.contactNumber}</TableCell>
                    <TableCell>{staff.startDate}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          staff.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : staff.status === "on-leave"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewStaff(staff.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Summary</CardTitle>
            <CardDescription>Staff distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Internal Medicine</span>
                <span className="font-medium">8 staff</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-primary" style={{ width: "40%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>Dermatology</span>
                <span className="font-medium">4 staff</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-primary" style={{ width: "20%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>Orthopedics</span>
                <span className="font-medium">6 staff</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-primary" style={{ width: "30%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>Front Desk</span>
                <span className="font-medium">2 staff</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-primary" style={{ width: "10%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Availability</CardTitle>
            <CardDescription>Current staff status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg border border-zinc-800 p-4">
                <p className="text-3xl font-bold text-green-500">18</p>
                <p className="mt-1 text-sm font-medium">Active</p>
              </div>
              <div className="rounded-lg border border-zinc-800 p-4">
                <p className="text-3xl font-bold text-yellow-500">3</p>
                <p className="mt-1 text-sm font-medium">On Leave</p>
              </div>
              <div className="rounded-lg border border-zinc-800 p-4">
                <p className="text-3xl font-bold text-blue-500">2</p>
                <p className="mt-1 text-sm font-medium">New Hires</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddStaffForm open={showAddForm} onOpenChange={setShowAddForm} onAddStaff={handleAddStaff} />
    </div>
  )
}

