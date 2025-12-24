import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { PlantSearch } from "@/components/puzzle/PlantSearch"
import { Species } from "@/lib/Species"
import { PuzzleTestIds } from "./PuzzleTestIds"

type AnswerInputCardProps = {
  selectedSpecies: Species | undefined
  onSelectSpecies: (species: Species | undefined) => void
  onSubmit: () => void
  onGiveUp: () => void
  guessNumber: number
  maxGuesses: number
}

export const AnswerInputCard = ({
  selectedSpecies,
  onSelectSpecies,
  onSubmit,
  onGiveUp,
  guessNumber,
  maxGuesses,
}: AnswerInputCardProps) => (
  <Card className="p-6">
    <div className="mb-2 flex items-center justify-between">
      <h2 className="font-serif text-2xl font-bold text-foreground">Can you identify this plant?</h2>
      <span className="text-sm text-muted-foreground" data-testid={PuzzleTestIds.guessCounter}>
        Guess {guessNumber} of {maxGuesses}
      </span>
    </div>
    <p className="text-sm text-muted-foreground">
      Study the photographs and enter the common or scientific name of the plant you think this is.
    </p>

    <div className="space-y-4">
      <PlantSearch onSelect={onSelectSpecies} selectedSpecies={selectedSpecies} />

      {selectedSpecies && (
        <Button onClick={onSubmit} className="w-full" size="lg" data-testid={PuzzleTestIds.submitAnswer}>
          I'll go with this
        </Button>
      )}

      <button
        type="button"
        onClick={onGiveUp}
        className="w-full text-sm text-muted-foreground hover:text-foreground"
        data-testid={PuzzleTestIds.giveUp}
      >
        Give up and show answer
      </button>
    </div>
  </Card>
)
