import { GlossaryTerm } from "@/components/glossary-term"
import { glossary } from "@/lib/glossary"

export const renderTipWithGlossary = (tip: string): React.ReactNode => {
  const parts: React.ReactNode[] = []
  const regex = /\[\[([^\]]+)\]\]/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(tip)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(tip.slice(lastIndex, match.index))
    }

    const term = match[1]
    const termLower = term.toLowerCase()
    // Check if term exists in glossary (case-insensitive)
    if (termLower in glossary) {
      parts.push(
        <GlossaryTerm key={match.index} term={termLower}>
          {term}
        </GlossaryTerm>,
      )
    } else {
      // Term not in glossary, render as plain text
      parts.push(term)
    }

    lastIndex = regex.lastIndex
  }

  // Add remaining text after last match
  if (lastIndex < tip.length) {
    parts.push(tip.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : parts
}
