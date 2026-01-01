import { forwardRef, useImperativeHandle } from "react"
import { useAnimate } from "motion/react"
import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { PlantSearch } from "@/components/puzzle/PlantSearch"
import { Species, SpeciesId } from "@/lib/Species"
import { PuzzleTestIds } from "./PuzzleTestIds"

interface AnswerInputCardProps {
  selectedSpecies: Species | undefined
  onSelectSpecies: (species: Species | undefined) => void
  onSubmit: () => void
  onGiveUp: () => void
  attemptNumber: number
  maxAttempts: number
  incorrectFeedbackText?: string
  excludedSpeciesIds?: SpeciesId[]
}

export interface AnswerInputCardHandle {
  shake: () => void
}

export const AnswerInputCard = forwardRef<AnswerInputCardHandle, AnswerInputCardProps>(
  (
    {
      selectedSpecies,
      onSelectSpecies,
      onSubmit,
      onGiveUp,
      attemptNumber,
      maxAttempts,
      incorrectFeedbackText,
      excludedSpeciesIds,
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate()

    useImperativeHandle(
      ref,
      () => ({
        shake: () => {
          animate(scope.current, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.35, ease: "easeInOut" })
        },
      }),
      [animate, scope],
    )

    return (
      <div ref={scope}>
        <Card className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-foreground">Can you identify this plant?</h2>
            <span className="text-sm text-muted-foreground" data-testid={PuzzleTestIds.attemptCounter}>
              Attempt {attemptNumber} of {maxAttempts}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Study the photographs and enter the common or scientific name of the plant you think this is.
          </p>

          <div className="space-y-4">
            <PlantSearch
              onSelect={onSelectSpecies}
              selectedSpecies={selectedSpecies}
              excludedSpeciesIds={excludedSpeciesIds}
            />

            {selectedSpecies && (
              <Button onClick={onSubmit} className="w-full" size="lg" data-testid={PuzzleTestIds.submitAnswer}>
                I'll go with this
              </Button>
            )}

            {incorrectFeedbackText && <p className="text-sm font-medium text-destructive">{incorrectFeedbackText}</p>}

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
      </div>
    )
  },
)

AnswerInputCard.displayName = "AnswerInputCard"
