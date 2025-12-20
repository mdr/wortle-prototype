import { Card } from "@/components/shadcn/Card"
import { Check, X } from "lucide-react"
import { Species } from "@/lib/plants"
import { renderTipWithGlossary } from "@/lib/render-tip"

interface AnswerResultProps {
  isCorrect: boolean
  gaveUp: boolean
  userAnswer: Species | undefined
  correctAnswer: Species
}

export const AnswerResult = ({ isCorrect, gaveUp, userAnswer, correctAnswer }: AnswerResultProps) => {
  const getHeading = () => {
    if (isCorrect) return "Correct!"
    if (gaveUp) return "Here's the answer"
    return "Not this time"
  }

  const getSubheading = () => {
    if (isCorrect) return "Well done on identifying the plant"
    if (gaveUp) return "Better luck with the next one"
    return "You'll get the next one"
  }

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
          <h2 className="font-serif text-2xl font-bold text-foreground">{getHeading()}</h2>
          <p className="text-sm text-foreground/70">{getSubheading()}</p>
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        {!isCorrect && userAnswer && (
          <div>
            <p className="mb-1 text-sm font-medium text-foreground/70">Your answer:</p>
            <div className="flex items-end justify-between rounded-md bg-background p-3">
              <div>
                <p className="font-medium text-foreground">{userAnswer.commonNames[0]}</p>
                <p className="text-sm italic text-muted-foreground">{userAnswer.scientificName}</p>
              </div>
              <p className="text-sm text-muted-foreground">{userAnswer.family}</p>
            </div>
          </div>
        )}

        <div>
          <p className="mb-1 text-sm font-medium text-foreground/70">Correct answer:</p>
          <div className="flex items-end justify-between rounded-md bg-background p-3">
            <div>
              <p className="font-medium text-foreground">{correctAnswer.commonNames[0]}</p>
              <p className="text-sm italic text-muted-foreground">{correctAnswer.scientificName}</p>
            </div>
            <p className="text-sm text-muted-foreground">{correctAnswer.family}</p>
          </div>
        </div>

        {correctAnswer.idTips.length > 0 && (
          <div className="rounded-lg bg-accent/10 p-4">
            <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">Identification Tips</h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
              {correctAnswer.idTips.map((tip, index) => (
                <li key={index}>{renderTipWithGlossary(tip)}</li>
              ))}
            </ul>
          </div>
        )}

        {correctAnswer.links.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Learn more:</p>
            <div className="flex flex-wrap gap-2">
              {correctAnswer.links.map((link, index) => (
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
        )}
      </div>
    </Card>
  )
}
