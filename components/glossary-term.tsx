"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { glossary } from "@/lib/glossary"

interface GlossaryTermProps {
  term: string
  children: React.ReactNode
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const definition = glossary[term as keyof typeof glossary]

  if (!definition) {
    return <>{children}</>
  }

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button type="button" className="cursor-help border-b border-dotted border-current text-inherit">
          {children}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 text-sm">
        <p className="font-semibold capitalize">{term}</p>
        <p className="text-muted-foreground">{definition}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
