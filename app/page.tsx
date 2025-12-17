"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import Link from "next/link"
import { getAllPuzzleIds } from "@/lib/puzzles"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export default function HomePage() {
  const puzzleIds = getAllPuzzleIds()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center gap-3">
              <img
                src={basePath + "/logo.png"}
                alt=""
                className="size-20"
              />
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">Wortle</h1>
                <p className="text-sm text-muted-foreground">Daily Wild Plant Quiz</p>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-4">
              <Link
                href="/about"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <HelpCircle className="size-5" />
                <span className="sr-only">About Wortle</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card className="p-6">
          <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">Prototype Examples</h2>
          <p className="mb-6 text-muted-foreground">
            Select a puzzle to try out the Wortle prototype. In the production version, there will be one puzzle per day for everyone.
          </p>

          <div className="flex flex-col gap-3">
            {puzzleIds.map((id) => (
              <Link key={id} href={`/puzzle/${id}`}>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  Puzzle #{id}
                </Button>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
