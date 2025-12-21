import { GlossaryTerm } from "@/components/puzzle/GlossaryTerm"
import { glossary } from "@/lib/glossary"

export type TipWithGlossaryProps = {
  tip: string
}

export const TipWithGlossary = ({ tip }: TipWithGlossaryProps) => {
  const parts: React.ReactNode[] = []
  const regex = /\[\[([^\]]+)\]\]/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(tip)) !== null) {
    if (match.index > lastIndex) {
      parts.push(tip.slice(lastIndex, match.index))
    }

    const term = match[1]
    const termLower = term.toLowerCase()
    if (termLower in glossary) {
      parts.push(
        <GlossaryTerm key={match.index} term={termLower}>
          {term}
        </GlossaryTerm>,
      )
    } else {
      parts.push(term)
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < tip.length) {
    parts.push(tip.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : parts
}
