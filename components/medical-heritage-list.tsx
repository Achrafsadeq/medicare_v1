"use client"

import { useState, useEffect } from "react"
import type { MedicalHeritage } from "@/lib/types"
import { mockMedicalHeritage } from "@/lib/mock-data"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MedicalHeritageListProps {
  patientId?: string
}

export function MedicalHeritageList({ patientId }: MedicalHeritageListProps) {
  const [heritageRecords, setHeritageRecords] = useState<MedicalHeritage[]>([])

  useEffect(() => {
    // Use mock data directly instead of API call
    const filteredRecords = patientId
      ? mockMedicalHeritage.filter((record) => record.patientId === patientId)
      : mockMedicalHeritage

    setHeritageRecords(filteredRecords)
  }, [patientId])

  const handleAddHeritage = () => {
    // In a real app, this would open a form
    alert("Add medical heritage record functionality would open a form")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Family Medical History</CardTitle>
            <CardDescription>Medical conditions in patient's family</CardDescription>
          </div>
          <Button size="sm" onClick={handleAddHeritage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {heritageRecords.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No family medical history records found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Family Member</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Age at Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heritageRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.familyMember}</TableCell>
                  <TableCell>{record.relationship}</TableCell>
                  <TableCell>{record.condition}</TableCell>
                  <TableCell>{record.diagnosisAge}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "active"
                          ? "bg-yellow-100 text-yellow-800"
                          : record.status === "managed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

