import { ReactNode, useMemo } from "react"
import { Iso8601Date } from "@/utils/brandedTypes"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { PuzzleMode, PuzzleService } from "./PuzzleService"
import { PuzzleServiceContext } from "./puzzleServiceHooks"
import { StatsStorage } from "@/lib/StatsStorage"
import { PuzzleCompletion } from "./puzzleTypes"
import { DailyStatsSummary } from "@/lib/dailyStatsSummary"

interface PuzzleServiceProviderProps {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
  mode: PuzzleMode
  statsStorage?: StatsStorage
  onComplete?: (completion: PuzzleCompletion) => void
  onStatsSummaryUpdated?: (summary: DailyStatsSummary) => void
  children: ReactNode
}

export const PuzzleServiceProvider = ({
  puzzle,
  correctSpecies,
  scheduledDate,
  mode,
  statsStorage,
  onComplete,
  onStatsSummaryUpdated,
  children,
}: PuzzleServiceProviderProps) => {
  const service = useMemo(
    () =>
      new PuzzleService(
        {
          puzzle,
          correctSpecies,
          scheduledDate,
          attempts: [],
          gaveUp: false,
          incorrectFeedbackText: undefined,
          selectedSpecies: undefined,
        },
        {
          mode,
          statsStorage,
          onComplete,
          onStatsSummaryUpdated,
        },
      ),
    [puzzle, correctSpecies, scheduledDate, mode, statsStorage, onComplete, onStatsSummaryUpdated],
  )

  return <PuzzleServiceContext.Provider value={service}>{children}</PuzzleServiceContext.Provider>
}
