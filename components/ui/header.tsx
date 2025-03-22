"use client"

import type React from "react"

import Link from "next/link"
import { Bell, ChevronDown, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
  logo?: React.ReactNode
  userMenu?: React.ReactNode
  actions?: React.ReactNode
}

export function Header({ className, logo, userMenu, actions }: HeaderProps) {
  const { config } = useApp()

  return (
    <header
      className={cn("flex h-16 items-center justify-between border-b border-zinc-800 bg-black px-4 md:px-6", className)}
    >
      {logo || (
        <Link href="/dashboard" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 md:h-6 md:w-6"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span className="hidden sm:inline">MediCare</span>
          <span className="sm:hidden">MC</span>
        </Link>
      )}

      <div className="flex items-center gap-2 md:gap-4">
        {actions}

        {config.features.notifications && (
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notifications</span>
          </Button>
        )}

        {userMenu || (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-1 md:px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-sm">
                  <span className="font-medium">Dr. Sarah Johnson</span>
                  <span className="text-xs text-muted-foreground">Administrator</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

