import { Link } from "@tanstack/react-router"
import { CheckCircle, XCircle } from "lucide-react"

import { findSpecies } from "@/lib/plants"
import { findPuzzle } from "@/lib/puzzles"
import { type DailyPuzzleRecord, DailyResult } from "@/lib/StatsStorage"
import { formatDate } from "@/utils/dateUtils"

import { HistoryTestIds } from "./HistoryTestIds"

interface HistoryItemProps {
  record: DailyPuzzleRecord
}

export const HistoryItem = ({ record }: HistoryItemProps) => {
  const puzzle = findPuzzle(record.puzzleId)
  const species = puzzle ? findSpecies(puzzle.speciesId) : undefined
  const speciesName = species?.commonNames[0] ?? species?.scientificName ?? "Unknown"
  const isPassed = record.result === DailyResult.PASS
  const guessCount = record.guessedSpeciesIds.length

  return (
    <Link to="/archive/$date" params={{ date: record.date }} data-testid={HistoryTestIds.historyItem}>
      <div className="bg-muted hover:bg-muted/80 flex items-center justify-between rounded-lg p-3 transition-colors">
        <div className="flex items-center gap-3">
          {isPassed ? <CheckCircle className="size-5 text-green-500" /> : <XCircle className="size-5 text-red-500" />}
          <div>
            <p className="text-foreground font-medium">{speciesName}</p>
            <p className="text-foreground/70 text-xs">{formatDate(record.date)}</p>
          </div>
        </div>
        <div className="text-foreground/70 text-sm">
          {guessCount} {guessCount === 1 ? "guess" : "guesses"}
        </div>
      </div>
    </Link>
  )
}
