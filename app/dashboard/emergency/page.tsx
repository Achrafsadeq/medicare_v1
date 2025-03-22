"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEmergencyProtocols } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Heart, Phone, Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AddEmergencyProtocolForm } from "@/components/add-emergency-protocol-form"
import type { EmergencyProtocol } from "@/lib/types"

export default function EmergencyPage() {
  const [protocols, setProtocols] = useState(mockEmergencyProtocols)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddProtocol = (newProtocol: EmergencyProtocol) => {
    setProtocols((prevProtocols) => [...prevProtocols, newProtocol])
  }

  const handleActivateEmergency = () => {
    alert("Emergency protocol activated! Notifications sent to all staff.")
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-white">Emergency</h1>
      <p className="text-muted-foreground">Access emergency protocols and resources.</p>

      <div className="flex items-center justify-between">
        <Button variant="destructive" size="lg" onClick={handleActivateEmergency}>
          <AlertTriangle className="mr-2 h-5 w-5" />
          Activate Emergency Protocol
        </Button>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Protocol
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Emergency Protocols</CardTitle>
            <CardDescription>Standard procedures for emergency situations</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {protocols.map((protocol, index) => (
                <AccordionItem key={protocol.id} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{protocol.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{protocol.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Steps:</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          {protocol.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Last updated: {protocol.lastUpdated}</span>
                        <span>Responsible: {protocol.responsibleStaff.join(", ")}</span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Important contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                <div className="rounded-full bg-red-500/20 p-2">
                  <Phone className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Emergency Services</p>
                  <p className="text-xl font-bold">911</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                <div className="rounded-full bg-red-500/20 p-2">
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Poison Control</p>
                  <p className="text-xl font-bold">1-800-222-1222</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                <div className="rounded-full bg-red-500/20 p-2">
                  <Phone className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Hospital Security</p>
                  <p className="text-xl font-bold">555-123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-500/20 p-2">
                  <Phone className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">On-Call Physician</p>
                  <p className="text-xl font-bold">555-987-6543</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddEmergencyProtocolForm open={showAddForm} onOpenChange={setShowAddForm} onAddProtocol={handleAddProtocol} />
    </div>
  )
}

