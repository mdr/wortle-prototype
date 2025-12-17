"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "@/components/image-gallery"
import { PlantSearch } from "@/components/plant-search"
import { AnswerResult } from "@/components/answer-result"
import { Share2, TrendingUp, Award, Flame, Clock, Flower2 } from "lucide-react"

// Mock data for Devil's-bit Scabious
const puzzleData = {
  id: 214,
  date: new Date("2026-06-11").toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  observationDate: new Date("2025-08-13").toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  location: "Northumberland, England",
  habitat: "Woodland",
  correctAnswer: {
    scientificName: "Succisa pratensis",
    commonNames: ["Devil's-bit Scabious", "Devil's-bit"],
  },
  links: [
    {
      name: "Plant Atlas",
      url: "https://plantatlas2020.org/atlas/2cd4p9h.23w",
    },
    {
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Succisa_pratensis",
    },
    {
      name: "NatureSpot",
      url: "https://www.naturespot.org/species/devils-bit-scabious",
    },
    {
      name: "Flora of East Anglia",
      url: "http://webidguides.com/_templates/group_scabious.html#Devil's-bit%20Scabious",
    },
  ],
  images: [
    {
      url: "/images/pxl-20250813-133852984.jpg",
      caption: "Flower head",
    },
    {
      url: "/images/pxl-20250813-133857730.jpg",
      caption: "Rear view of flower",
    },
    {
      url: "/images/pxl-20250813-133915947.jpg",
      caption: "Closer up of flower head",
    },
    {
      url: "/images/pxl-20250813-133808104.jpg",
      caption: "Leaves",
    },
  ],
  photoAttribution: {
    photographer: "Matt Russell",
    license: "CC-BY 4.0",
  },
}

const userStats = {
  totalIdentifications: 42,
  correctIdentifications: 38,
  currentStreak: 7,
  maxStreak: 12,
}

export default function Page() {
  const [selectedPlant, setSelectedPlant] = useState<{ name: string; scientific: string } | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (selectedPlant) {
      const correct =
        selectedPlant.scientific === puzzleData.correctAnswer.scientificName ||
        puzzleData.correctAnswer.commonNames.some((name) => name.toLowerCase() === selectedPlant.name.toLowerCase())
      setIsCorrect(correct)
      setIsAnswered(true)
    }
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

  const handleShare = () => {
    const shareText = `Wortle #${puzzleData.id}\n${isCorrect ? "✅" : "❌"} ${accuracy}% accuracy\n🔥 ${userStats.currentStreak} day streak\n\nPlay at: wortle.app`

    if (navigator.share) {
      navigator.share({ text: shareText })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Share text copied to clipboard!")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Flower2 className="size-6" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">Wortle</h1>
                <p className="text-sm text-muted-foreground">Daily Wild Plant Quiz</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{puzzleData.date}</p>
              <p className="text-xs text-muted-foreground">Puzzle #{puzzleData.id}</p>
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
            {/* Observation Details */}
            <Card className="p-4">
              <h2 className="mb-1 font-serif text-2xl font-bold text-foreground">Observation Details</h2>
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
                  <span className="font-medium text-muted-foreground">Date observed:</span>
                  <span className="text-foreground">{puzzleData.observationDate}</span>
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
                  <PlantSearch onSelect={setSelectedPlant} selectedPlant={selectedPlant} />

                  <Button onClick={handleSubmit} disabled={!selectedPlant} className="w-full" size="lg">
                    Submit Answer
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                {/* Answer Result */}
                <AnswerResult
                  isCorrect={isCorrect}
                  userAnswer={selectedPlant}
                  correctAnswer={puzzleData.correctAnswer}
                  links={puzzleData.links}
                />

                {/* Stats Panel */}
                <Card className="p-4">
                  <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Your Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <TrendingUp className="size-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{userStats.totalIdentifications}</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Award className="size-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Accuracy</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Flame className="size-4 text-orange-500" />
                        <span className="text-xs text-muted-foreground">Streak</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{userStats.currentStreak}</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="mb-1 flex items-center gap-2">
                        <Award className="size-4 text-amber-500" />
                        <span className="text-xs text-muted-foreground">Max Streak</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{userStats.maxStreak}</p>
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

                    <Button onClick={handleShare} variant="outline" className="w-full bg-transparent" size="sm">
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
