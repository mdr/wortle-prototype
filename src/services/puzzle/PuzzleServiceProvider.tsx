import { ReactNode, useMemo } from "react"
import { Iso8601Date } from "@/utils/brandedTypes"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { PuzzleMode, PuzzleService } from "./PuzzleService"
import { PuzzleServiceContext } from "./puzzleServiceHooks"
import { StatsStorage } from "@/lib/StatsStorage"

interface PuzzleServiceProviderProps {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
  mode: PuzzleMode
  statsStorage?: StatsStorage
  children: ReactNode
}

export const PuzzleServiceProvider = ({
  puzzle,
  correctSpecies,
  scheduledDate,
  mode,
  statsStorage,
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
      },
    )
  }, [puzzle, correctSpecies, scheduledDate, mode, statsStorage])

  return <PuzzleServiceContext.Provider value={service}>{children}</PuzzleServiceContext.Provider>
}
