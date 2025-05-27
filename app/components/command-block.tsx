"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandBlockProps {
  command: string
  className?: string
}

export function CommandBlock({ command, className }: CommandBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div
      className={cn(
        "relative bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm w-full min-w-0 overflow-hidden",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-400 hover:text-white flex-shrink-0"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="pr-12 overflow-x-auto whitespace-pre-wrap break-all">
        <span className="text-yellow-400">$ </span>
        {command}
      </pre>
    </div>
  )
}
