import { useState, useRef } from "react"
import { Card } from "@/components/shadcn/Card"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { PuzzleHeader } from "@/components/puzzle/PuzzleHeader"
import { WhereAndWhenCard } from "@/components/puzzle/WhereAndWhenCard"
import { AnswerInputCard } from "@/components/puzzle/AnswerInputCard"
import { GuessHistory } from "@/components/puzzle/GuessHistory"
import { StatsPanel } from "@/components/puzzle/StatsPanel"
import confetti from "canvas-confetti"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { GuessFeedback, createGuessFeedback } from "@/lib/GuessFeedback"
import { PuzzleTestIds } from "./PuzzleTestIds"

const MAX_GUESSES = 3

export type PuzzlePageProps = {
  puzzle: Puzzle
  correctSpecies: Species
}

const userStats = {
  totalIdentifications: 42,
  correctIdentifications: 38,
  currentStreak: 7,
  maxStreak: 12,
}

export const PuzzlePage = ({ puzzle, correctSpecies }: PuzzlePageProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | undefined>(undefined)
  const [guesses, setGuesses] = useState<GuessFeedback[]>([])
  const [gaveUp, setGaveUp] = useState(false)
  const answerPanelRef = useRef<HTMLDivElement>(null)

  const isCorrect = guesses.some((g) => g.isCorrect)
  const isAnswered = isCorrect || guesses.length >= MAX_GUESSES || gaveUp

  const handleSubmit = () => {
    if (selectedSpecies) {
      const feedback = createGuessFeedback(selectedSpecies, correctSpecies)
      setGuesses((prev) => [...prev, feedback])
      setSelectedSpecies(undefined)

      if (feedback.isCorrect) {
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
      }
    }
  }

  const handleGiveUp = () => {
    setSelectedSpecies(undefined)
    setGaveUp(true)
  }

  return (
    <main className="min-h-screen bg-background" data-testid={PuzzleTestIds.page}>
      <PuzzleHeader puzzle={puzzle} />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="overflow-hidden p-4">
              <ImageGallery images={puzzle.images} attribution={puzzle.photoAttribution} />
            </Card>
          </div>

          <div className="space-y-4">
            <WhereAndWhenCard puzzle={puzzle} />

            {guesses.length > 0 && !isAnswered && <GuessHistory guesses={guesses} />}

            {!isAnswered ? (
              <AnswerInputCard
                selectedSpecies={selectedSpecies}
                onSelectSpecies={setSelectedSpecies}
                onSubmit={handleSubmit}
                onGiveUp={handleGiveUp}
                guessNumber={guesses.length + 1}
                maxGuesses={MAX_GUESSES}
              />
            ) : (
              <>
                <div ref={answerPanelRef}>
                  <AnswerResult
                    isCorrect={isCorrect}
                    gaveUp={gaveUp}
                    guesses={guesses}
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
