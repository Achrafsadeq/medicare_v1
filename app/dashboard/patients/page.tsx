import { PatientList } from "@/components/patient-list"

export default function PatientsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold text-white">Patients</h1>
      <p className="text-muted-foreground">Manage patient records and information.</p>

      <PatientList />
    </div>
  )
}

