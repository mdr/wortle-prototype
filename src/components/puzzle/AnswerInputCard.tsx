import { useCallback } from "react"
import { useAnimate } from "motion/react"
import type { AnimationOptions, DOMKeyframesDefinition } from "motion/react"
import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { PlantSearch } from "@/components/puzzle/PlantSearch"
import { PuzzleTestIds } from "./PuzzleTestIds"
import { usePuzzleServiceActions, usePuzzleState } from "@/services/puzzle/puzzleServiceHooks"
import { MAX_ATTEMPTS } from "@/services/puzzle/PuzzleService"
import { assert } from "tsafe"

const SHAKE_ANIMATION: DOMKeyframesDefinition = { x: [0, -6, 6, -4, 4, 0] }
const SHAKE_TRANSITION: AnimationOptions = { duration: 0.35, ease: "easeInOut" }

export const AnswerInputCard = () => {
  const [scope, animate] = useAnimate()
  const puzzleActions = usePuzzleServiceActions()
  const { attempts, incorrectFeedbackText, selectedSpecies } = usePuzzleState((state) => state)

  const shake = useCallback(() => {
    animate(scope.current, SHAKE_ANIMATION, SHAKE_TRANSITION)
  }, [animate, scope])

  const handleSubmit = () => {
    assert(selectedSpecies, "Selected species is required to submit an answer.")
    const isCorrect = puzzleActions.submitGuess(selectedSpecies.id)
    if (!isCorrect) {
      shake()
    }
  }

  return (
    <div ref={scope}>
      <Card className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-foreground">Can you identify this plant?</h2>
          <span className="text-sm text-muted-foreground" data-testid={PuzzleTestIds.attemptCounter}>
            Attempt {attempts.length + 1} of {MAX_ATTEMPTS}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Study the photographs and enter the common or scientific name of the plant you think this is.
        </p>

        <div className="space-y-4">
          <PlantSearch />

          {selectedSpecies && (
            <Button onClick={handleSubmit} className="w-full" size="lg" data-testid={PuzzleTestIds.submitAnswer}>
              I'll go with this
            </Button>
          )}

          {incorrectFeedbackText && <p className="text-sm font-medium text-destructive">{incorrectFeedbackText}</p>}

          <button
            type="button"
            onClick={() => puzzleActions.giveUp()}
            className="w-full text-sm text-muted-foreground hover:text-foreground"
            data-testid={PuzzleTestIds.giveUp}
          >
            Give up and show answer
          </button>
        </div>
      </Card>
    </div>
  )
}
