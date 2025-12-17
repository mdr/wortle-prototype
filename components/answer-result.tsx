"use client"

import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { GlossaryTerm } from "@/components/glossary-term"

interface AnswerResultProps {
  isCorrect: boolean
  userAnswer: { name: string; scientific: string } | null
  correctAnswer: {
    scientificName: string
    commonNames: string[]
  }
  links?: Array<{ name: string; url: string }>
}

export function AnswerResult({ isCorrect, userAnswer, correctAnswer, links }: AnswerResultProps) {
  return (
    <Card className={`p-6 ${isCorrect ? "border-primary bg-primary/5" : "border-destructive bg-destructive/5"}`}>
      <div className="mb-4 flex items-center gap-3">
        {isCorrect ? (
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-6" />
          </div>
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
            <X className="size-6" />
          </div>
        )}
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">{isCorrect ? "Correct!" : "Not this time"}</h2>
          <p className="text-sm text-muted-foreground">
            {isCorrect ? "Well done on identifying the plant" : "Better luck next time"}
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        {!isCorrect && userAnswer && (
          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">Your answer:</p>
            <div className="rounded-md bg-background p-3">
              <p className="font-medium text-foreground">{userAnswer.name}</p>
              <p className="text-sm italic text-muted-foreground">{userAnswer.scientific}</p>
            </div>
          </div>
        )}

        <div>
          <p className="mb-1 text-sm font-medium text-muted-foreground">Correct answer:</p>
          <div className="rounded-md bg-background p-3">
            <p className="font-medium text-foreground">{correctAnswer.commonNames[0]}</p>
            <p className="text-sm italic text-muted-foreground">{correctAnswer.scientificName}</p>
          </div>
        </div>

        <div className="rounded-lg bg-accent/10 p-4">
          <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">Identification Tips</h3>
          <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
            <li>Flower heads rounded with equal sized <GlossaryTerm term="floret">florets</GlossaryTerm></li>
            <li>All leaves <GlossaryTerm term="entire">entire</GlossaryTerm></li>
            <li><GlossaryTerm term="corolla">Corolla</GlossaryTerm> 4-lobed</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Learn more:</p>
          <div className="flex flex-wrap gap-2">
            {links?.map((link, index) => (
              <span key={link.name} className="flex items-center gap-2">
                {index > 0 && <span className="text-muted-foreground">•</span>}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  {link.name}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
