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
    <main className="min-h-screen bg-background" data-testid="home-page">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center gap-3">
              <img src={basePath + "/logo.png"} alt="" className="size-20" />
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
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Welcome to the Wortle prototype!</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This is a project to create a daily plant ID quiz - a bit like the "Wordle" but for botany! The idea is
                to be a fun community-driven thing to get people interested in wild plants and help them practice their
                plant ID skills.
              </p>
              <p>
                This site is currently just a proof of concept to demonstrate the idea - click the links below to see
                examples of how it might work. I&apos;d love to hear your thoughts on the prototype - does it make sense
                what to do, and could any aspects be improved? And ultimately, is it fun and might it interest people?
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Try the prototype</h2>
            <p className="text-muted-foreground">Select a puzzle below to see how it might work:</p>

            <div className="flex flex-col gap-3">
              {puzzleIds.map((id) => (
                <Link key={id} href={`/puzzle/${id}`} data-testid="puzzle-link">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    Puzzle #{id}
                  </Button>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">How you can help</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a software developer by trade and emphatically not a botanist, in fact very much a beginner!
                One of the key ways I&apos;ll need help is in making sure the botanical details are correct. Most
                obviously, to verify that the plants are indeed what they are claimed to be, but also that the
                photographs give sufficient detail to unambiguously identify the species, and to help give correct and
                useful ID tips to players.
              </p>
              <p>
                I&apos;ll also need help to collect enough sets of photos to be able to keep up with the pace of showing
                a new puzzle each day.
              </p>
              <p>
                If you&apos;d be interested in helping out this project, either to help with reviewing the botany, or
                contributing puzzle photos, or helping with the technical aspects - please get in touch. I&apos;m Matt
                Russell, and you can reach me at{" "}
                <a href="mailto:mattrusselluk@gmail.com" className="underline hover:text-foreground">
                  mattrusselluk@gmail.com
                </a>
                .
              </p>
              <p>
                As mentioned above, the intention is for this to be a community project - certainly no interest in
                commercialising or putting in adverts etc. The code and photographs will be open source.
              </p>
              <p>
                The aim is to launch this in Spring 2026, to give time to collect enough puzzles and get the site ready.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
