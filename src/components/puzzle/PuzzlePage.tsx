import { useRef, useState } from "react"
import { Card } from "@/components/shadcn/Card"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { PuzzleHeader } from "@/components/puzzle/PuzzleHeader"
import { WhereAndWhenCard } from "@/components/puzzle/WhereAndWhenCard"
import { AnswerInputCard, AnswerInputCardHandle } from "@/components/puzzle/AnswerInputCard"
import { AttemptHistory } from "@/components/puzzle/AttemptHistory"
import { StatsPanel } from "@/components/puzzle/StatsPanel"
import { useCorrectAnswerConfetti } from "@/components/puzzle/useCorrectAnswerConfetti"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { AttemptFeedback, createAttemptFeedback } from "@/lib/AttemptFeedback"
import { DailyResult } from "@/lib/StatsStorage"
import { PuzzleTestIds } from "./PuzzleTestIds"
import { Iso8601Date } from "@/utils/brandedTypes"
import { assert } from "tsafe"

const MAX_ATTEMPTS = 3

export interface PuzzleCompletion {
  result: DailyResult
  attempts: number
  gaveUp: boolean
}

export interface PuzzlePageProps {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
  onComplete?: (completion: PuzzleCompletion) => void
}

const userStats = {
  totalIdentifications: 42,
  correctIdentifications: 38,
  currentStreak: 7,
  maxStreak: 12,
}

export const PuzzlePage = ({ puzzle, correctSpecies, scheduledDate, onComplete }: PuzzlePageProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | undefined>(undefined)
  const [attempts, setAttempts] = useState<AttemptFeedback[]>([])
  const [gaveUp, setGaveUp] = useState(false)
  const [incorrectFeedbackText, setIncorrectFeedbackText] = useState<string | undefined>(undefined)
  const { fireConfetti, panelRef: answerPanelRef } = useCorrectAnswerConfetti()
  const answerInputRef = useRef<AnswerInputCardHandle>(null)

  const isCorrect = attempts.some((a) => a.isCorrect)
  const isResolved = isCorrect || attempts.length >= MAX_ATTEMPTS || gaveUp

  const handleSubmit = () => {
    assert(selectedSpecies, "Selected species is required to submit an answer.")
    const feedback = createAttemptFeedback(selectedSpecies, correctSpecies)
    const nextAttemptsCount = attempts.length + 1
    const isFinalAttempt = feedback.isCorrect || nextAttemptsCount >= MAX_ATTEMPTS

    if (isFinalAttempt) {
      onComplete?.({
        result: feedback.isCorrect ? DailyResult.PASS : DailyResult.FAIL,
        attempts: nextAttemptsCount,
        gaveUp: false,
      })
    }

    setAttempts((prev) => [...prev, feedback])
    setSelectedSpecies(undefined)

    if (feedback.isCorrect) {
      setIncorrectFeedbackText(undefined)
      fireConfetti()
    } else {
      const feedbackText = feedback.genusMatch
        ? "Right genus - you're close!"
        : feedback.familyMatch
          ? "That's in the right family - have another go."
          : "That's not it - have another go."
      setIncorrectFeedbackText(feedbackText)
      answerInputRef.current?.shake()
    }
  }

  const handleGiveUp = () => {
    setSelectedSpecies(undefined)
    setGaveUp(true)
    setIncorrectFeedbackText(undefined)

    onComplete?.({
      result: DailyResult.FAIL,
      attempts: attempts.length,
      gaveUp: true,
    })
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

            {attempts.length > 0 && !isResolved && <AttemptHistory attempts={attempts} />}

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
                <StatsPanel isCorrect={isCorrect} userStats={userStats} />
              </>
            ) : (
              <AnswerInputCard
                ref={answerInputRef}
                selectedSpecies={selectedSpecies}
                onSelectSpecies={(species) => {
                  setSelectedSpecies(species)
                  setIncorrectFeedbackText(undefined)
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
