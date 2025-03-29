"use client";

import type React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/ui/header"
import { Home, Users, Calendar, FolderOpen, Briefcase, FileText, Heart } from "lucide-react"

// Navigation configuration
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
    badge: 248,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
    badge: 12,
  },
  {
    title: "Medical Records",
    href: "/dashboard/medical-records",
    icon: FolderOpen,
  },
  {
    title: "Staff",
    href: "/dashboard/staff",
    icon: Briefcase,
  },
  {
    title: "Insurance",
    href: "/dashboard/insurance",
    icon: FileText,
  },
  {
    title: "Emergency",
    href: "/dashboard/emergency",
    icon: Heart,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar navItems={navItems} />
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

