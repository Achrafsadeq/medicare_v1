"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Calendar,
  FolderOpen,
  Briefcase,
  FileText,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useConfig } from "@/contexts/config-context"
import { cn } from "@/lib/utils"

// Configurable navigation items
export interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: number | string
}

// Default navigation items
const defaultNavItems: NavItem[] = [
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

interface SidebarProps {
  navItems?: NavItem[]
  className?: string
}

export function Sidebar({ navItems = defaultNavItems, className }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isSidebarCollapsed, setSidebarCollapsed, layout } = useConfig()

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed)
  }

  const NavLinks = ({ collapsed = false }: { collapsed?: boolean }) => (
    <ul className="flex-1 space-y-1 px-2 py-4">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
              collapsed && "justify-center px-0",
            )}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.title : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1 text-xs font-medium">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )

  // Mobile sidebar
  const MobileSidebar = () => (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden absolute left-4 top-4 z-50 text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-black border-r border-zinc-800">
        <div className="flex h-16 items-center border-b border-zinc-800 px-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            MediCare
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto text-white" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <nav className="flex flex-1 flex-col">
          <NavLinks />
        </nav>
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      <MobileSidebar />
      <aside
        className={cn(
          "hidden md:flex flex-col bg-black border-r border-zinc-800 transition-all duration-300",
          isSidebarCollapsed ? "w-[4rem]" : "w-64",
          className,
        )}
      >
        {layout.sidebar.collapsible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-20 z-10 -mr-3 h-6 w-6 rounded-full border border-zinc-800 bg-black text-white"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
        <nav className="flex flex-1 flex-col">
          <NavLinks collapsed={isSidebarCollapsed} />
        </nav>
      </aside>
    </>
  )
}

