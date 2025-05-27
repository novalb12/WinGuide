"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CommandBlock } from "./command-block"
import { Package, Download, Filter } from "lucide-react"

interface App {
  name: string
  id: string
  description: string
  category?: string
}

interface AppGridProps {
  title: string
  apps: App[]
  category: string
}

export function AppGrid({ title, apps, category }: AppGridProps) {
  const [showBatchInstall, setShowBatchInstall] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  const categories = [...new Set(apps.map((app) => app.category).filter(Boolean))]

  // Filter apps based on selected categories
  const filteredApps =
    selectedCategories.length > 0 ? apps.filter((app) => selectedCategories.includes(app.category || "")) : apps

  const generateBatchCommand = () => {
    return filteredApps.map((app) => `winget install --id=${app.id} -e`).join(" && ")
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const selectAllCategories = () => {
    setSelectedCategories(categories.filter(Boolean) as string[])
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 space-y-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Windows Applications</h1>
          <p className="text-muted-foreground">
            Complete collection of essential Windows applications installable via winget.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold truncate">{title}</h2>
            <p className="text-muted-foreground">
              {filteredApps.length} of {apps.length} applications
              {selectedCategories.length > 0 && ` (${selectedCategories.join(", ")})`}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {categories.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter by Category</span>
                <span className="sm:hidden">Filter</span>
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowBatchInstall(!showBatchInstall)}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Batch Install</span>
              <span className="sm:hidden">Batch</span>
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        {showFilters && categories.length > 0 && (
          <Card className="w-full">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg">Filter by Category</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={selectAllCategories}>
                    Select All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearAllCategories}>
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat ?? ''}
                    variant={selectedCategories.includes(cat ?? '') ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80 text-xs"
                    onClick={() => toggleCategory(cat ?? '')}
                  >
                    {cat} ({apps.filter((app) => app.category === cat).length})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Batch Install Section */}
        {showBatchInstall && filteredApps.length > 0 && (
          <Card className="border-blue-200 bg-blue-50 w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Batch Install {selectedCategories.length > 0 ? "Selected Categories" : "All Applications"}
              </CardTitle>
              <CardDescription>
                Copy and run this command in PowerShell to install {filteredApps.length} applications at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommandBlock command={generateBatchCommand()} />
              <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <h4 className="font-semibold mb-2">Applications included ({filteredApps.length}):</h4>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {filteredApps.map((app) => (
                    <Badge key={app.id} variant="secondary" className="text-xs">
                      {app.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Scrollable Apps Grid */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
          {filteredApps.map((app) => (
            <Card key={app.id} className="hover:shadow-md transition-shadow h-fit w-full min-w-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{app.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{app.description}</CardDescription>
                  </div>
                  {app.category && (
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {app.category}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground font-mono bg-gray-100 p-2 rounded break-all overflow-hidden">
                    {app.id}
                  </div>
                  <div className="w-full overflow-hidden">
                    <CommandBlock command={`winget install --id=${app.id} -e`} className="text-xs" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
