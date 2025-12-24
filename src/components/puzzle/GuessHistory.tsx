import { Card } from "@/components/shadcn/Card"
import { GuessFeedback } from "@/lib/GuessFeedback"
import { getSpecies } from "@/lib/plants"
import { GuessHistoryTestIds } from "./PuzzleTestIds"

type GuessHistoryProps = {
  guesses: GuessFeedback[]
}

const getHintText = (guess: GuessFeedback): string | undefined => {
  if (guess.isCorrect) return undefined
  if (guess.genusMatch) return "Right genus!"
  if (guess.familyMatch) return "Right family!"
  return undefined
}

const getGuessStyles = (guess: GuessFeedback): string => {
  if (guess.isCorrect) return "border-primary bg-primary/10"
  if (guess.genusMatch || guess.familyMatch) return "border-amber-500 bg-amber-500/10"
  return "border-destructive bg-destructive/10"
}

export const GuessHistory = ({ guesses }: GuessHistoryProps) => (
  <Card className="p-4" data-testid={GuessHistoryTestIds.container}>
    <h3 className="mb-3 text-sm font-medium text-muted-foreground">Previous guesses</h3>
    <div className="space-y-2">
      {guesses.map((guess, index) => {
        const species = getSpecies(guess.speciesId)
        if (!species) return undefined
        const hint = getHintText(guess)
        return (
          <div
            key={guess.speciesId}
            className={`flex items-center justify-between rounded-md border p-3 ${getGuessStyles(guess)}`}
            data-testid={GuessHistoryTestIds.guessItem}
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
                  data-testid={GuessHistoryTestIds.hint}
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
