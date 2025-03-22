"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockInsuranceClaims } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddInsuranceClaimForm } from "@/components/add-insurance-claim-form"
import type { InsuranceClaim } from "@/lib/types"

export default function InsurancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [claims, setClaims] = useState(mockInsuranceClaims)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter claims based on search query and status
  const filteredClaims = claims.filter(
    (claim) =>
      (claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.insuranceProvider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.policyNumber.includes(searchQuery)) &&
      (statusFilter === "all" || claim.status === statusFilter),
  )

  const handleAddClaim = (newClaim: InsuranceClaim) => {
    setClaims((prevClaims) => [...prevClaims, newClaim])
  }

  const handleViewClaim = (id: string) => {
    alert(`View claim details for ID: ${id}`)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-white">Insurance</h1>
      <p className="text-muted-foreground">Manage patient insurance information and claims.</p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search claims..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Claims</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Claim
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insurance Claims</CardTitle>
          <CardDescription>Manage patient insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Insurance Provider</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No insurance claims found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.patientName}</TableCell>
                    <TableCell>{claim.insuranceProvider}</TableCell>
                    <TableCell>{claim.policyNumber}</TableCell>
                    <TableCell>{claim.serviceDate}</TableCell>
                    <TableCell>${claim.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === "submitted"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : claim.status === "in-review"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : claim.status === "approved"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : claim.status === "denied"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        }`}
                      >
                        {claim.status
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClaim(claim.id)}>
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
            <CardTitle>Claims Summary</CardTitle>
            <CardDescription>Overview of claim status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Submitted</span>
                <span className="font-medium">12 claims</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: "20%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>In Review</span>
                <span className="font-medium">8 claims</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-yellow-500" style={{ width: "15%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>Approved</span>
                <span className="font-medium">15 claims</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "25%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>Denied</span>
                <span className="font-medium">5 claims</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-red-500" style={{ width: "10%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span>Paid</span>
                <span className="font-medium">18 claims</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: "30%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insurance Providers</CardTitle>
            <CardDescription>Claims by insurance provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                <div className="rounded-full bg-blue-500/20 p-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Blue Cross</p>
                  <p className="text-sm text-muted-foreground">15 patients, 22 claims</p>
                  <p className="text-sm text-muted-foreground">Total: $3,450.00</p>
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>

              <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                <div className="rounded-full bg-blue-500/20 p-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Aetna</p>
                  <p className="text-sm text-muted-foreground">12 patients, 18 claims</p>
                  <p className="text-sm text-muted-foreground">Total: $2,875.00</p>
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-500/20 p-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">UnitedHealthcare</p>
                  <p className="text-sm text-muted-foreground">10 patients, 15 claims</p>
                  <p className="text-sm text-muted-foreground">Total: $2,250.00</p>
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddInsuranceClaimForm open={showAddForm} onOpenChange={setShowAddForm} onAddClaim={handleAddClaim} />
    </div>
  )
}

