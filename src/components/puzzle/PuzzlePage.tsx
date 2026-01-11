import { useEffect, useRef } from "react"

import { AnswerInputCard } from "@/components/puzzle/AnswerInputCard"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { AttemptHistory } from "@/components/puzzle/AttemptHistory"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { PuzzleHeader } from "@/components/puzzle/PuzzleHeader"
import { StatsPanel } from "@/components/puzzle/StatsPanel"
import { useCorrectAnswerConfetti } from "@/components/puzzle/useCorrectAnswerConfetti"
import { WhereAndWhenCard } from "@/components/puzzle/WhereAndWhenCard"
import { Card } from "@/components/shadcn/Card"
import { selectIsCorrect, selectIsResolved, selectShowAttemptHistory } from "@/services/puzzle/puzzleSelectors"
import { usePuzzleState } from "@/services/puzzle/puzzleServiceHooks"

import { PuzzleTestIds } from "./PuzzleTestIds"

export interface PuzzlePageProps {
  showStatsPlaceholder?: boolean
}

export const PuzzlePage = ({ showStatsPlaceholder }: PuzzlePageProps) => {
  const { puzzle, scheduledDate, attempts, statsSummary } = usePuzzleState()

  const isCorrect = usePuzzleState(selectIsCorrect)
  const isResolved = usePuzzleState(selectIsResolved)
  const showAttemptHistory = usePuzzleState(selectShowAttemptHistory)
  const { fireConfetti, panelRef: answerPanelRef } = useCorrectAnswerConfetti()
  const wasCorrectRef = useRef(isCorrect)

  useEffect(() => {
    if (isCorrect && !wasCorrectRef.current) {
      fireConfetti()
    }
    wasCorrectRef.current = isCorrect
  }, [fireConfetti, isCorrect])

  return (
    <main className="min-h-screen bg-background" data-testid={PuzzleTestIds.page}>
      <PuzzleHeader puzzle={puzzle} scheduledDate={scheduledDate} />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="overflow-hidden p-4">
              <ImageGallery />
            </Card>
          </div>

          <div className="space-y-4">
            <WhereAndWhenCard puzzle={puzzle} />

            {showAttemptHistory && !isResolved && <AttemptHistory attempts={attempts} />}

            {isResolved ? (
              <>
                <div ref={answerPanelRef}>
                  <AnswerResult />
                </div>
                {statsSummary && <StatsPanel summary={statsSummary} />}
                {!statsSummary && showStatsPlaceholder && (
                  <Card className="p-4">
                    <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">Your Statistics</h3>
                    <p className="text-sm text-muted-foreground">Stats are only tracked for the daily puzzle.</p>
                  </Card>
                )}
              </>
            ) : (
              <AnswerInputCard />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
