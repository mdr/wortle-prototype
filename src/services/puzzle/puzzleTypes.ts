import { DailyResult } from "@/lib/StatsStorage"
import { SpeciesId } from "@/lib/Species"

export interface PuzzleCompletion {
  result: DailyResult
  guessedSpeciesIds: SpeciesId[]
}
