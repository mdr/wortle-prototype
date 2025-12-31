import { Iso8601Date } from "@/utils/brandedTypes"
import { PuzzleId } from "./Puzzle"

export type ScheduleEntry = {
  date: Iso8601Date
  puzzleId: PuzzleId
}

const schedule: ScheduleEntry[] = [
  { date: Iso8601Date("2026-06-08"), puzzleId: PuzzleId(40) },
  { date: Iso8601Date("2026-06-09"), puzzleId: PuzzleId(41) },
  { date: Iso8601Date("2026-06-10"), puzzleId: PuzzleId(42) },
  { date: Iso8601Date("2026-06-11"), puzzleId: PuzzleId(43) },
  { date: Iso8601Date("2026-06-12"), puzzleId: PuzzleId(44) },
]

export const findFirstDateForPuzzle = (puzzleId: PuzzleId): Iso8601Date | undefined =>
  schedule.find((entry) => entry.puzzleId === puzzleId)?.date

export const getDatesForPuzzle = (puzzleId: PuzzleId): Iso8601Date[] =>
  schedule.filter((entry) => entry.puzzleId === puzzleId).map((entry) => entry.date)

export const findPuzzleForDate = (date: Iso8601Date): PuzzleId | undefined =>
  schedule.find((entry) => entry.date === date)?.puzzleId

export const getAllScheduledDates = (): Iso8601Date[] => schedule.map((entry) => entry.date)
