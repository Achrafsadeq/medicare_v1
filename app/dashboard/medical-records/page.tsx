"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockMedicalRecords, mockPatients } from "@/lib/mock-data"
import { MedicalHeritageList } from "@/components/medical-heritage-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddMedicalRecordForm } from "@/components/add-medical-record-form"
import type { MedicalRecord } from "@/lib/types"

export default function MedicalRecordsPage() {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0].id)
  const [medicalRecords, setMedicalRecords] = useState(mockMedicalRecords)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter records for the selected patient
  const patientRecords = medicalRecords.filter((record) => record.patientId === selectedPatient)

  const selectedPatientData = mockPatients.find((p) => p.id === selectedPatient)

  const handleAddRecord = (newRecord: MedicalRecord) => {
    setMedicalRecords((prevRecords) => [...prevRecords, newRecord])
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-white">Medical Records</h1>
      <p className="text-muted-foreground">Access and update patient medical records.</p>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Select a patient to view records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockPatients.map((patient) => (
                <Button
                  key={patient.id}
                  variant={selectedPatient === patient.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  {patient.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          {selectedPatientData && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{selectedPatientData.name}</CardTitle>
                <CardDescription>
                  {selectedPatientData.age} years old, {selectedPatientData.gender}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Contact Information</p>
                    <p className="text-sm text-muted-foreground">{selectedPatientData.contactNumber}</p>
                    <p className="text-sm text-muted-foreground">{selectedPatientData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Insurance</p>
                    <p className="text-sm text-muted-foreground">{selectedPatientData.insuranceProvider}</p>
                    <p className="text-sm text-muted-foreground">Policy: {selectedPatientData.insuranceNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="records">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="heritage">Family History</TabsTrigger>
            </TabsList>
            <TabsContent value="records" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Medical Records</CardTitle>
                      <CardDescription>Patient's medical history and diagnoses</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => setShowAddForm(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Record
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {patientRecords.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No medical records found for this patient.</p>
                  ) : (
                    <div className="space-y-6">
                      {patientRecords.map((record) => (
                        <div key={record.id} className="border-b border-zinc-800 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{record.diagnosis}</h3>
                            <span className="text-sm text-muted-foreground">{record.date}</span>
                          </div>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Symptoms:</span> {record.symptoms.join(", ")}
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Doctor:</span> {record.doctorName}
                          </p>
                          <p className="text-sm mb-2">
                            <span className="font-medium">Notes:</span> {record.notes}
                          </p>
                          {record.attachments.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium mb-1">Attachments:</p>
                              <div className="flex flex-wrap gap-2">
                                {record.attachments.map((attachment, index) => (
                                  <Button key={index} variant="outline" size="sm">
                                    {attachment}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heritage" className="mt-6">
              <MedicalHeritageList patientId={selectedPatient} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddMedicalRecordForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onAddRecord={handleAddRecord}
        patientId={selectedPatient}
      />
    </div>
  )
}

