import { useRef } from "react"
import { Card } from "@/components/shadcn/Card"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { PuzzleHeader } from "@/components/puzzle/PuzzleHeader"
import { WhereAndWhenCard } from "@/components/puzzle/WhereAndWhenCard"
import { AnswerInputCard, AnswerInputCardHandle } from "@/components/puzzle/AnswerInputCard"
import { AttemptHistory } from "@/components/puzzle/AttemptHistory"
import { StatsPanel } from "@/components/puzzle/StatsPanel"
import { useCorrectAnswerConfetti } from "@/components/puzzle/useCorrectAnswerConfetti"
import { PuzzleTestIds } from "./PuzzleTestIds"
import { assert } from "tsafe"
import { DailyStatsSummary } from "@/lib/dailyStatsSummary"
import { Clock } from "@/lib/Clock"
import {
  usePuzzleIsCorrect,
  usePuzzleIsResolved,
  usePuzzleShowAttemptHistory,
  usePuzzleService,
  usePuzzleStateSelector,
} from "@/services/puzzle/puzzleServiceHooks"
import { MAX_ATTEMPTS } from "@/services/puzzle/PuzzleService"

export interface PuzzlePageProps {
  statsSummary?: DailyStatsSummary
  showStatsPlaceholder?: boolean
  clock: Clock
}

export const PuzzlePage = ({ statsSummary, showStatsPlaceholder, clock }: PuzzlePageProps) => {
  const { puzzle, correctSpecies, scheduledDate, attempts, gaveUp, incorrectFeedbackText, selectedSpecies } =
    usePuzzleStateSelector((state) => state)
  const puzzleService = usePuzzleService()
  const { fireConfetti, panelRef: answerPanelRef } = useCorrectAnswerConfetti()
  const answerInputRef = useRef<AnswerInputCardHandle>(null)

  const isCorrect = usePuzzleIsCorrect()
  const isResolved = usePuzzleIsResolved()
  const showAttemptHistory = usePuzzleShowAttemptHistory()

  const handleSubmit = () => {
    assert(selectedSpecies, "Selected species is required to submit an answer.")
    const { feedback } = puzzleService.submitGuess(selectedSpecies)
    if (feedback.isCorrect) {
      fireConfetti()
    } else {
      answerInputRef.current?.shake()
    }
  }

  const handleGiveUp = () => {
    puzzleService.giveUp()
  }

  return (
    <main className="min-h-screen bg-background" data-testid={PuzzleTestIds.page}>
      <PuzzleHeader puzzle={puzzle} scheduledDate={scheduledDate} />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="overflow-hidden p-4">
              <ImageGallery images={puzzle.images} attribution={puzzle.photoAttribution} />
            </Card>
          </div>

          <div className="space-y-4">
            <WhereAndWhenCard puzzle={puzzle} />

            {showAttemptHistory && !isResolved && <AttemptHistory attempts={attempts} />}

            {isResolved ? (
              <>
                <div ref={answerPanelRef}>
                  <AnswerResult
                    isCorrect={isCorrect}
                    gaveUp={gaveUp}
                    attempts={attempts}
                    correctAnswer={correctSpecies}
                  />
                </div>
                {statsSummary && <StatsPanel summary={statsSummary} clock={clock} />}
                {!statsSummary && showStatsPlaceholder && (
                  <Card className="p-4">
                    <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">Your Statistics</h3>
                    <p className="text-sm text-muted-foreground">Stats are only tracked for the daily puzzle.</p>
                  </Card>
                )}
              </>
            ) : (
              <AnswerInputCard
                ref={answerInputRef}
                selectedSpecies={selectedSpecies}
                onSelectSpecies={(species) => {
                  puzzleService.setSelectedSpecies(species)
                  puzzleService.clearIncorrectFeedbackText()
                }}
                onSubmit={handleSubmit}
                onGiveUp={handleGiveUp}
                attemptNumber={attempts.length + 1}
                maxAttempts={MAX_ATTEMPTS}
                incorrectFeedbackText={incorrectFeedbackText}
                excludedSpeciesIds={attempts.map((a) => a.speciesId)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
