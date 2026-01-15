import { Iso8601Date } from "@/utils/brandedTypes"

import { PuzzleId } from "./Puzzle"

export interface ScheduleEntry {
  date: Iso8601Date
  puzzleId: PuzzleId
}

export interface Schedule {
  findPuzzleForDate: (date: Iso8601Date) => PuzzleId | undefined
  findFirstDateForPuzzle: (puzzleId: PuzzleId) => Iso8601Date | undefined
  getDatesForPuzzle: (puzzleId: PuzzleId) => Iso8601Date[]
  getAllScheduledDates: () => Iso8601Date[]
  findFirstScheduledDate: () => Iso8601Date | undefined
}

export class DefaultSchedule implements Schedule {
  private readonly entries: ScheduleEntry[]

  constructor(entries: ScheduleEntry[]) {
    this.entries = entries
  }

  findPuzzleForDate = (date: Iso8601Date): PuzzleId | undefined =>
    this.entries.find((entry) => entry.date === date)?.puzzleId

  findFirstDateForPuzzle = (puzzleId: PuzzleId): Iso8601Date | undefined =>
    this.entries.find((entry) => entry.puzzleId === puzzleId)?.date

  getDatesForPuzzle = (puzzleId: PuzzleId): Iso8601Date[] =>
    this.entries.filter((entry) => entry.puzzleId === puzzleId).map((entry) => entry.date)

  getAllScheduledDates = (): Iso8601Date[] => this.entries.map((entry) => entry.date)

  findFirstScheduledDate = (): Iso8601Date | undefined =>
    this.entries.reduce<Iso8601Date | undefined>(
      (earliest, entry) => (!earliest || entry.date < earliest ? entry.date : earliest),
      undefined,
    )
}

const defaultEntries: ScheduleEntry[] = [
  { date: Iso8601Date("2026-06-08"), puzzleId: PuzzleId(43) },
  { date: Iso8601Date("2026-06-09"), puzzleId: PuzzleId(41) },
  { date: Iso8601Date("2026-06-10"), puzzleId: PuzzleId(42) },
  { date: Iso8601Date("2026-06-11"), puzzleId: PuzzleId(40) },
  { date: Iso8601Date("2026-06-12"), puzzleId: PuzzleId(44) },
]

export const defaultSchedule: Schedule = new DefaultSchedule(defaultEntries)
