import { useState, useRef } from "react"
import { Link } from "@tanstack/react-router"
import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { ImageGallery } from "@/components/puzzle/imageGallery/ImageGallery"
import { PlantSearch } from "@/components/puzzle/PlantSearch"
import { AnswerResult } from "@/components/puzzle/AnswerResult"
import { UkLocationMap } from "@/components/puzzle/UkLocationMap"
import { Share2, TrendingUp, Award, Flame, Clock, HelpCircle } from "lucide-react"
import confetti from "canvas-confetti"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { formatDate } from "@/utils/dateUtils"
import { assetUrl } from "@/utils/utils"
import { ClassNameList } from "@/utils/brandedTypes"
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

  const accuracy = Math.round((userStats.correctIdentifications / userStats.totalIdentifications) * 100)

  const getTimeToNextWortle = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
    tomorrow.setUTCHours(0, 0, 0, 0)

    const diff = tomorrow.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  return (
    <main className="min-h-screen bg-background" data-testid={PuzzleTestIds.page}>
      {/* Header */}
      <header className="min-w-[334px] border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex flex-shrink-0 items-center gap-3">
              <img src={assetUrl("/logo.png")} alt="" className="size-12 min-[440px]:size-20" />
              <div>
                <h1 className="font-serif text-xl font-bold text-foreground min-[440px]:text-2xl">Wortle</h1>
                <p className="hidden text-sm text-muted-foreground min-[440px]:block">Daily Wild Plant Quiz</p>
              </div>
            </Link>
            <div className="flex flex-shrink-0 items-center gap-4">
              <div className="text-right">
                <p className="whitespace-nowrap text-sm font-medium text-foreground">{formatDate(puzzleData.date)}</p>
                <p className="text-xs text-muted-foreground">Puzzle #{puzzleData.id}</p>
              </div>
              <Link
                to="/about"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <HelpCircle className="size-5" />
                <span className="sr-only">About Wortle</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column: Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden p-4">
              <ImageGallery images={puzzleData.images} attribution={puzzleData.photoAttribution} />
            </Card>
          </div>

          {/* Right column: Answer Input or Result */}
          <div className="space-y-4">
            {/* Where and When */}
            <Card className="p-4">
              <h2 className="mb-1 font-serif text-2xl font-bold text-foreground">Where and when</h2>
              <div className="flex gap-4">
                <UkLocationMap
                  latitude={puzzleData.coordinates.lat}
                  longitude={puzzleData.coordinates.lng}
                  className={ClassNameList("h-40 w-30 flex-shrink-0 rounded border border-border")}
                />
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-muted-foreground">Location:</span>
                    <span className="text-foreground">{puzzleData.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-muted-foreground">Habitat:</span>
                    <span className="text-foreground">{puzzleData.habitat}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-muted-foreground">Date:</span>
                    <span className="text-foreground">{formatDate(puzzleData.observationDate)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Answer Input or Result */}
            {!isAnswered ? (
              <Card className="p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">Can you identify this plant?</h2>
                <p className="text-sm text-muted-foreground">
                  Study the photographs and enter the common or scientific name of the plant you think this is.
                </p>

                <div className="space-y-4">
                  <PlantSearch onSelect={setSelectedSpecies} selectedSpecies={selectedSpecies} />

                  {selectedSpecies && (
                    <Button
                      onClick={handleSubmit}
                      className="w-full"
                      size="lg"
                      data-testid={PuzzleTestIds.submitAnswer}
                    >
                      I'll go with this
                    </Button>
                  )}

                  <button
                    type="button"
                    onClick={handleGiveUp}
                    className="w-full text-sm text-muted-foreground hover:text-foreground"
                    data-testid={PuzzleTestIds.giveUp}
                  >
                    Give up and show answer
                  </button>
                </div>
              </Card>
            ) : (
              <>
                {/* Answer Result */}
                <div ref={answerPanelRef}>
                  <AnswerResult
                    isCorrect={isCorrect}
                    gaveUp={gaveUp}
                    userAnswer={selectedSpecies}
                    correctAnswer={correctSpecies}
                  />
                </div>

                {/* Stats Panel */}
                <Card className="p-4">
                  <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Your Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <TrendingUp className="size-4 text-primary" />
                        <span className="text-xs text-foreground/70">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {userStats.totalIdentifications}{" "}
                        <span className="text-sm font-normal text-foreground/70">quizzes played</span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Award className="size-4 text-primary" />
                        <span className="text-xs text-foreground/70">Accuracy</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {accuracy}% <span className="text-sm font-normal text-foreground/70">correct</span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Flame className="size-4 text-orange-500" />
                        <span className="text-xs text-foreground/70">Streak</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {isCorrect ? userStats.currentStreak : 0}{" "}
                        <span className="text-sm font-normal text-foreground/70">in a row</span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Award className="size-4 text-amber-500" />
                        <span className="text-xs text-foreground/70">Max Streak</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {userStats.maxStreak} <span className="text-sm font-normal text-foreground/70">in a row</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-foreground" />
                        <span className="text-sm font-medium text-foreground">Next Wortle</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{getTimeToNextWortle()}</span>
                    </div>

                    <Button onClick={() => {}} variant="outline" className="w-full bg-transparent" size="sm">
                      <Share2 className="mr-2 size-4" />
                      Share Result
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
