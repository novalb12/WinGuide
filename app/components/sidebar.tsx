"use client"

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Monitor, Code, Wrench, Zap } from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navigationItems = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", label: "Overview", icon: Monitor },
    ],
  },
  {
    title: "WSL Environments",
    items: [
      { id: "git", label: "Git", icon: Code },
      { id: "nodejs", label: "Node.js & npm", icon: Code },
      { id: "python", label: "Python + pyenv + Poetry", icon: Code },
      { id: "docker", label: "Docker", icon: Code },
    ],
  },
  {
    title: "Windows Applications",
    items: [{ id: "windows-apps", label: "All Windows Apps", icon: Monitor }],
  },
  {
    title: "Troubleshooting",
    items: [
      { id: "common-issues", label: "Common Issues", icon: Wrench },
      { id: "performance", label: "Performance", icon: Zap },
    ],
  },
]

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <SidebarComponent className="w-80 bg-gray-100">
      <SidebarHeader className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Complete Setup Guide
        </h1>
        <p className="text-sm text-muted-foreground mt-2">WSL + Windows Development Environment</p>
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          <p>💡 Click any command to copy</p>
          <p>🚀 Use batch install for multiple apps</p>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  )
}
