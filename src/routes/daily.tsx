import { createFileRoute, notFound } from "@tanstack/react-router"
import { PuzzleCompletion, PuzzlePage } from "@/components/puzzle/PuzzlePage"
import { findPuzzle } from "@/lib/puzzles"
import { findSpecies } from "@/lib/plants"
import { findPuzzleForDate } from "@/lib/schedule"
import { NotFoundPage } from "@/components/NotFoundPage"
import { ErrorFallback } from "@/components/ErrorFallback"
import { defaultClock } from "@/lib/Clock"
import { Iso8601Date } from "@/utils/brandedTypes"
import { Species } from "@/lib/Species"
import { Puzzle } from "@/lib/Puzzle"
import { StatsStorage } from "@/lib/StatsStorage"
import { useCallback, useMemo } from "react"
import { produce } from "immer"

interface DailyPuzzleData {
  scheduledDate: Iso8601Date
  puzzle?: Puzzle
  correctSpecies?: Species
}

export const Route = createFileRoute("/daily")({
  loader: (): DailyPuzzleData => {
    const scheduledDate = defaultClock.todayIso()
    const puzzleId = findPuzzleForDate(scheduledDate)

    if (!puzzleId) {
      return { scheduledDate }
    }

    const puzzle = findPuzzle(puzzleId)
    if (!puzzle) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- TanStack Router pattern
      throw notFound()
    }
    const correctSpecies = findSpecies(puzzle.speciesId)
    if (!correctSpecies) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- TanStack Router pattern
      throw notFound()
    }

    return { puzzle, correctSpecies, scheduledDate }
  },
  component: () => <DailyPuzzlePage />,
  notFoundComponent: () => <NotFoundPage message="Today's puzzle isn't available yet. Please check back later." />,
  errorComponent: ({ error }) => <ErrorFallback error={error} />,
})

const DailyPuzzlePage = () => {
  const { puzzle, correctSpecies, scheduledDate } = Route.useLoaderData()
  const storage = useMemo(() => new StatsStorage(window.localStorage), [])

  const handleComplete = useCallback(
    (completion: PuzzleCompletion) => {
      storage.update((current) =>
        produce(current, (draft) => {
          const puzzleId = puzzle?.id
          if (!puzzleId) {
            return
          }
          draft.history = draft.history.filter((record) => record.date !== scheduledDate)
          draft.history.push({
            date: scheduledDate,
            puzzleId,
            result: completion.result,
            attempts: completion.attempts,
          })
        }),
      )
    },
    [puzzle?.id, scheduledDate, storage],
  )

  if (!puzzle || !correctSpecies) {
    return <NotFoundPage message="No puzzle is scheduled for today." />
  }

  return (
    <PuzzlePage
      puzzle={puzzle}
      correctSpecies={correctSpecies}
      scheduledDate={scheduledDate}
      onComplete={handleComplete}
    />
  )
}
