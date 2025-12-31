import { useRef, useState } from "react"
import { Card } from "@/components/shadcn/Card"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { PuzzleHeader } from "@/components/puzzle/PuzzleHeader"
import { WhereAndWhenCard } from "@/components/puzzle/WhereAndWhenCard"
import { AnswerInputCard } from "@/components/puzzle/AnswerInputCard"
import { AttemptHistory } from "@/components/puzzle/AttemptHistory"
import { StatsPanel } from "@/components/puzzle/StatsPanel"
import confetti from "canvas-confetti"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { AttemptFeedback, createAttemptFeedback } from "@/lib/AttemptFeedback"
import { PuzzleTestIds } from "./PuzzleTestIds"
import { Iso8601Date } from "@/utils/brandedTypes"

const MAX_ATTEMPTS = 3

export type PuzzlePageProps = {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
}

const userStats = {
  totalIdentifications: 42,
  correctIdentifications: 38,
  currentStreak: 7,
  maxStreak: 12,
}

export const PuzzlePage = ({ puzzle, correctSpecies, scheduledDate }: PuzzlePageProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | undefined>(undefined)
  const [attempts, setAttempts] = useState<AttemptFeedback[]>([])
  const [gaveUp, setGaveUp] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [incorrectFeedbackText, setIncorrectFeedbackText] = useState("")
  const answerPanelRef = useRef<HTMLDivElement>(null)

  const isCorrect = attempts.some((a) => a.isCorrect)
  const isAnswered = isCorrect || attempts.length >= MAX_ATTEMPTS || gaveUp

  const handleSubmit = () => {
    if (selectedSpecies) {
      const feedback = createAttemptFeedback(selectedSpecies, correctSpecies)
      setAttempts((prev) => [...prev, feedback])
      setSelectedSpecies(undefined)

      if (feedback.isCorrect) {
        setIncorrectFeedbackText("")
        setTimeout(() => {
          const panel = answerPanelRef.current
          if (panel) {
            const rect = panel.getBoundingClientRect()
            const x = (rect.left + rect.width / 2) / window.innerWidth
            const y = (rect.top + rect.height / 2) / window.innerHeight
            void confetti({ origin: { x, y } })
          } else {
            void confetti()
          }
        }, 50)
      } else {
        const feedbackText = feedback.genusMatch
          ? "Right genus - you're close!"
          : feedback.familyMatch
            ? "That's in the right family - have another go."
            : "That's not it - have another go."
        setIncorrectFeedbackText(feedbackText)
        setShaking(true)
        setTimeout(() => setShaking(false), 300)
      }
    }
  }

  const handleGiveUp = () => {
    setSelectedSpecies(undefined)
    setGaveUp(true)
    setIncorrectFeedbackText("")
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

            {attempts.length > 0 && !isAnswered && <AttemptHistory attempts={attempts} />}

            {!isAnswered ? (
              <AnswerInputCard
                selectedSpecies={selectedSpecies}
                onSelectSpecies={(species) => {
                  setSelectedSpecies(species)
                  setIncorrectFeedbackText("")
                }}
                onSubmit={handleSubmit}
                onGiveUp={handleGiveUp}
                attemptNumber={attempts.length + 1}
                maxAttempts={MAX_ATTEMPTS}
                shaking={shaking}
                incorrectFeedbackText={incorrectFeedbackText}
                excludedSpeciesIds={attempts.map((a) => a.speciesId)}
              />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
