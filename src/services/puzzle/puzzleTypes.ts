import { SpeciesId } from "@/lib/Species"
import { DailyResult } from "@/lib/StatsStorage"

export interface PuzzleCompletion {
  result: DailyResult
  guessedSpeciesIds: SpeciesId[]
}
