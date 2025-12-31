import { createFileRoute, notFound } from "@tanstack/react-router"
import { PuzzlePage } from "@/components/puzzle/PuzzlePage"
import { findPuzzle } from "@/lib/puzzles"
import { PuzzleId } from "@/lib/Puzzle"
import { findSpecies } from "@/lib/plants"
import { NotFoundPage } from "@/components/NotFoundPage"
import { ErrorFallback } from "@/components/ErrorFallback"

export const Route = createFileRoute("/review/$puzzleId")({
  loader: ({ params }) => {
    const puzzleId = PuzzleId(parseInt(params.puzzleId, 10))
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
    return { puzzle, correctSpecies }
  },
  component: () => <PuzzlePageWrapper />,
  notFoundComponent: () => (
    <NotFoundPage message="This puzzle doesn't exist. Please choose a puzzle from the home page." />
  ),
  errorComponent: ({ error }) => <ErrorFallback error={error} />,
})

const PuzzlePageWrapper = () => {
  const { puzzle, correctSpecies } = Route.useLoaderData()
  return <PuzzlePage puzzle={puzzle} correctSpecies={correctSpecies} />
}
