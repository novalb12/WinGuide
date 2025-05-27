import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommandBlock } from "./command-block"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

interface BatchFunctionProps {
	title: string
  description?: string
  commands: string[]
}

export function BatchFunction({ title, description, commands }: BatchFunctionProps) {
  const [showBatchInstall, setShowBatchInstall] = useState(false)

  const generateBatchCommand = () => {
    return commands.join(" && ")
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setShowBatchInstall(!showBatchInstall)}
        className="flex items-center gap-2"
      >
        <Package className="h-4 w-4" />
        <span className="hidden sm:inline">Batch Install</span>
        <span className="sm:hidden">Batch</span>
      </Button>

      {showBatchInstall && (
        <Card className="border-blue-200 bg-blue-50 w-full mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <CommandBlock command={generateBatchCommand()} />
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <h4 className="font-semibold mb-2">Commands included ({commands.length}):</h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {commands.map((cmd, index) => (
                  <div key={index} className="text-xs font-mono bg-white/50 p-2 rounded">
                    {cmd}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
