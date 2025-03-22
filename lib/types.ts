export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  bloodType: string
  contactNumber: string
  email: string
  address: string
  insuranceProvider: string
  insuranceNumber: string
  emergencyContact: string
  registrationDate: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: number
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  type: "check-up" | "follow-up" | "emergency" | "consultation" | "procedure"
  notes: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  date: string
  doctorId: string
  doctorName: string
  diagnosis: string
  symptoms: string[]
  notes: string
  attachments: string[]
}

export interface Treatment {
  id: string
  patientId: string
  patientName: string
  condition: string
  treatmentPlan: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "discontinued"
  notes: string
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  medicationName: string
  dosage: string
  frequency: string
  startDate: string
  endDate: string
  refills: number
  status: "active" | "completed" | "discontinued"
  notes: string
}

export interface LabResult {
  id: string
  patientId: string
  patientName: string
  testName: string
  testDate: string
  resultDate: string
  result: string
  normalRange: string
  status: "normal" | "abnormal" | "critical"
  notes: string
}

export interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  contactNumber: string
  email: string
  startDate: string
  status: "active" | "on-leave" | "terminated"
}

export interface TelemedicineSession {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  notes: string
  recordingUrl?: string
}

export interface InsuranceClaim {
  id: string
  patientId: string
  patientName: string
  insuranceProvider: string
  policyNumber: string
  serviceDate: string
  claimDate: string
  amount: number
  status: "submitted" | "in-review" | "approved" | "denied" | "paid"
  notes: string
}

export interface EmergencyProtocol {
  id: string
  title: string
  description: string
  steps: string[]
  lastUpdated: string
  responsibleStaff: string[]
}

export interface MedicalHeritage {
  id: string
  patientId: string
  patientName: string
  familyMember: string
  relationship: string
  condition: string
  diagnosisAge: number
  status: "active" | "managed" | "deceased"
  notes: string
}

export interface DashboardStats {
  totalPatients: number
  appointmentsToday: number
  pendingLabResults: number
  activeTreatments: number
  recentRegistrations: number
  upcomingAppointments: number
}

export interface AnalyticsData {
  patientsByAge: {
    ageRange: string
    count: number
  }[]
  appointmentsByType: {
    type: string
    count: number
  }[]
  treatmentSuccess: {
    condition: string
    successRate: number
  }[]
  revenueByMonth: {
    month: string
    amount: number
  }[]
}

