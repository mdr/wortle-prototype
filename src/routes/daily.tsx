import { createFileRoute, notFound } from "@tanstack/react-router"

import { ErrorFallback } from "@/components/ErrorFallback"
import { NotFoundPage } from "@/components/NotFoundPage"
import { PuzzlePage } from "@/components/puzzle/PuzzlePage"
import { useStatsStorage } from "@/lib/GlobalDependencies"
import { findSpecies } from "@/lib/plants"
import { Puzzle } from "@/lib/Puzzle"
import { findPuzzle } from "@/lib/puzzles"
import { findPuzzleForDate } from "@/lib/schedule"
import { Species } from "@/lib/Species"
import { PuzzleMode } from "@/services/puzzle/PuzzleService"
import { PuzzleServiceProvider } from "@/services/puzzle/PuzzleServiceProvider"
import { Iso8601Date } from "@/utils/brandedTypes"

interface DailyPuzzleData {
  scheduledDate: Iso8601Date
  puzzle?: Puzzle
  correctSpecies?: Species
}

export const Route = createFileRoute("/daily")({
  loader: ({ context }): DailyPuzzleData => {
    const scheduledDate = context.clock.todayIso()
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
  const statsStorage = useStatsStorage()
  if (!puzzle || !correctSpecies) {
    return <NotFoundPage message="No puzzle is scheduled for today." />
  }

  return (
    <PuzzleServiceProvider
      puzzle={puzzle}
      correctSpecies={correctSpecies}
      scheduledDate={scheduledDate}
      mode={PuzzleMode.DAILY}
      statsStorage={statsStorage}
    >
      <PuzzlePage />
    </PuzzleServiceProvider>
  )
}
