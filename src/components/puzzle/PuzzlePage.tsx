import { useState, useRef } from "react"
import { Card } from "@/components/shadcn/Card"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { PuzzleHeader } from "@/components/puzzle/PuzzleHeader"
import { WhereAndWhenCard } from "@/components/puzzle/WhereAndWhenCard"
import { AnswerInputCard } from "@/components/puzzle/AnswerInputCard"
import { StatsPanel } from "@/components/puzzle/StatsPanel"
import confetti from "canvas-confetti"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { PuzzleTestIds } from "./PuzzleTestIds"

export type PuzzlePageProps = {
  puzzleData: Puzzle
  correctSpecies: Species
}

const userStats = {
  totalIdentifications: 42,
  correctIdentifications: 38,
  currentStreak: 7,
  maxStreak: 12,
}

export const PuzzlePage = ({ puzzleData, correctSpecies }: PuzzlePageProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | undefined>(undefined)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gaveUp, setGaveUp] = useState(false)
  const answerPanelRef = useRef<HTMLDivElement>(null)

  const handleSubmit = () => {
    if (selectedSpecies) {
      const correct = selectedSpecies.id === puzzleData.speciesId
      setIsCorrect(correct)
      setIsAnswered(true)

      if (correct) {
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
    setIsAnswered(true)
  }

  return (
    <main className="min-h-screen bg-background" data-testid={PuzzleTestIds.page}>
      <PuzzleHeader puzzleData={puzzleData} />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="overflow-hidden p-4">
              <ImageGallery images={puzzleData.images} attribution={puzzleData.photoAttribution} />
            </Card>
          </div>

          <div className="space-y-4">
            <WhereAndWhenCard puzzleData={puzzleData} />

            {!isAnswered ? (
              <AnswerInputCard
                selectedSpecies={selectedSpecies}
                onSelectSpecies={setSelectedSpecies}
                onSubmit={handleSubmit}
                onGiveUp={handleGiveUp}
              />
            ) : (
              <>
                <div ref={answerPanelRef}>
                  <AnswerResult
                    isCorrect={isCorrect}
                    gaveUp={gaveUp}
                    userAnswer={selectedSpecies}
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
