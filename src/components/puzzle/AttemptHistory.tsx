import { Card } from "@/components/shadcn/Card"
import { AttemptFeedback } from "@/lib/AttemptFeedback"
import { findSpecies } from "@/lib/plants"
import { AttemptHistoryTestIds } from "./PuzzleTestIds"

type AttemptHistoryProps = {
  attempts: AttemptFeedback[]
}

const getHintText = (attempt: AttemptFeedback): string | undefined => {
  if (attempt.isCorrect) return undefined
  if (attempt.genusMatch) return "Right genus!"
  if (attempt.familyMatch) return "Right family!"
  return undefined
}

const getAttemptStyles = (attempt: AttemptFeedback): string => {
  if (attempt.isCorrect) return "border-primary bg-primary/10"
  if (attempt.genusMatch || attempt.familyMatch) return "border-amber-500 bg-amber-500/10"
  return "border-destructive bg-destructive/10"
}

export const AttemptHistory = ({ attempts }: AttemptHistoryProps) => (
  <Card className="p-4" data-testid={AttemptHistoryTestIds.container}>
    <h3 className="mb-3 text-sm font-medium text-muted-foreground">Previous attempts</h3>
    <div className="space-y-2">
      {attempts.map((attempt, index) => {
        const species = findSpecies(attempt.speciesId)
        if (!species) return undefined
        const hint = getHintText(attempt)
        return (
          <div
            key={attempt.speciesId}
            className={`flex items-center justify-between rounded-md border p-3 ${getAttemptStyles(attempt)}`}
            data-testid={AttemptHistoryTestIds.attemptItem}
          >
            <div>
              <p className="font-medium text-foreground">{species.commonNames[0]}</p>
              <p className="text-sm italic text-muted-foreground">{species.scientificName}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">#{index + 1}</span>
              {hint && (
                <p
                  className="text-sm font-medium text-amber-600 dark:text-amber-400"
                  data-testid={AttemptHistoryTestIds.hint}
                >
                  {hint}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  </Card>
)
