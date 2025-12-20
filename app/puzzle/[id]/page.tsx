import { getAllPuzzleIds } from "@/lib/puzzles"
import PuzzleClient from "./puzzle-client"

export const generateStaticParams = () => {
  return getAllPuzzleIds().map((id) => ({
    id: String(id),
  }))
}

export default function PuzzlePage({ params }: { params: Promise<{ id: string }> }) {
  return <PuzzleClient params={params} />
}
