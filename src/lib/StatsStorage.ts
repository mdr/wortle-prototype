import { PuzzleId } from "@/lib/Puzzle"
import { Iso8601Date } from "@/utils/brandedTypes"
import { Equals, assert } from "tsafe"
import { z } from "zod"

export enum DailyResult {
  PASS = "PASS",
  FAIL = "FAIL",
}

export interface DailyPuzzleStats {
  readonly puzzleId: PuzzleId
  readonly result: DailyResult
  readonly attempts: number
}

export interface DailyPuzzleRecord extends DailyPuzzleStats {
  readonly date: Iso8601Date
}

export interface StatsSnapshot {
  readonly history: DailyPuzzleRecord[]
}

const dailyPuzzleRecordSchema: z.ZodType<DailyPuzzleRecord> = z
  .strictObject({
    date: z.string().transform(Iso8601Date),
    puzzleId: z.number().int().transform(PuzzleId),
    result: z.enum([DailyResult.PASS, DailyResult.FAIL]),
    attempts: z.number().int(),
  })
  .readonly()

export const statsSnapshotSchema: z.ZodType<StatsSnapshot> = z
  .strictObject({
    history: z.array(dailyPuzzleRecordSchema),
  })
  .readonly()

assert<Equals<StatsSnapshot, z.infer<typeof statsSnapshotSchema>>>()

const STORAGE_KEY = "dev:wortle:stats"

const defaultStats: StatsSnapshot = {
  history: [],
}

export class StatsStorage {
  private readonly storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  load = (): StatsSnapshot => {
    const raw = this.storage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultStats
    }

    try {
      const parsed: unknown = JSON.parse(raw)
      const result = statsSnapshotSchema.safeParse(parsed)
      if (!result.success) {
        console.error("Failed to parse stats snapshot from storage.", result.error)
        return defaultStats
      }
      return result.data
    } catch (error) {
      console.error("Failed to parse stats snapshot from storage.", error)
      return defaultStats
    }
  }

  save = (stats: StatsSnapshot): void => {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(stats))
  }

  update = (updater: (current: StatsSnapshot) => StatsSnapshot): StatsSnapshot => {
    const next = updater(this.load())
    this.save(next)
    return next
  }

  clear = (): void => {
    this.storage.removeItem(STORAGE_KEY)
  }
}
