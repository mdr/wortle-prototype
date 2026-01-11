import { ReactNode, useMemo } from "react"

import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { DailyPuzzleRecord, StatsStorage } from "@/lib/StatsStorage"
import { Iso8601Date } from "@/utils/brandedTypes"

import { PuzzleMode, PuzzleService } from "./PuzzleService"
import { PuzzleServiceContext } from "./puzzleServiceHooks"

interface PuzzleServiceProviderProps {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
  mode: PuzzleMode
  statsStorage?: StatsStorage
  completionRecord?: DailyPuzzleRecord
  children: ReactNode
}

export const PuzzleServiceProvider = ({
  puzzle,
  correctSpecies,
  scheduledDate,
  mode,
  statsStorage,
  completionRecord,
  children,
}: PuzzleServiceProviderProps) => {
  const service = useMemo(() => {
    return new PuzzleService(
      {
        puzzle,
        correctSpecies,
        scheduledDate,
      },
      {
        mode,
        statsStorage,
        completionRecord,
      },
    )
  }, [puzzle, correctSpecies, scheduledDate, mode, statsStorage, completionRecord])

  return <PuzzleServiceContext.Provider value={service}>{children}</PuzzleServiceContext.Provider>
}
