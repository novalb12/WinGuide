"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { MainContent } from "./components/main-content"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SetupGuide() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <div className="w-80 flex-shrink-0">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
        <MainContent activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </SidebarProvider>
  )
}
