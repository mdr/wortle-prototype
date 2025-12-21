import { createFileRoute, notFound } from "@tanstack/react-router"
import { PuzzlePage } from "@/components/puzzle/PuzzlePage"
import { getPuzzle } from "@/lib/puzzles"
import { PuzzleId } from "@/lib/Puzzle"
import { getSpecies } from "@/lib/plants"

export const Route = createFileRoute("/puzzle/$id")({
  loader: ({ params }) => {
    const puzzleId = PuzzleId(parseInt(params.id, 10))
    const puzzleData = getPuzzle(puzzleId)
    if (!puzzleData) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- TanStack Router pattern
      throw notFound()
    }
    const correctSpecies = getSpecies(puzzleData.speciesId)
    if (!correctSpecies) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- TanStack Router pattern
      throw notFound()
    }
    return { puzzleData, correctSpecies }
  },
  component: () => <PuzzlePageWrapper />,
  notFoundComponent: () => <div>Puzzle not found</div>,
})

const PuzzlePageWrapper = () => {
  const { puzzleData, correctSpecies } = Route.useLoaderData()
  return <PuzzlePage puzzleData={puzzleData} correctSpecies={correctSpecies} />
}
