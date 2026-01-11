import { assert, Equals } from "tsafe"
import { z } from "zod"

import { logger } from "@/lib/Logger"
import { PuzzleId } from "@/lib/Puzzle"
import { SpeciesId } from "@/lib/Species"
import { Iso8601Date } from "@/utils/brandedTypes"

export enum DailyResult {
  PASS = "PASS",
  FAIL = "FAIL",
}

export interface DailyPuzzleRecord {
  readonly date: Iso8601Date
  readonly puzzleId: PuzzleId
  readonly result: DailyResult
  readonly guessedSpeciesIds: SpeciesId[]
}

export interface StatsSnapshot {
  readonly history: DailyPuzzleRecord[]
}

const dailyPuzzleRecordSchema: z.ZodType<DailyPuzzleRecord> = z
  .strictObject({
    date: z.string().transform(Iso8601Date),
    puzzleId: z.number().int().transform(PuzzleId),
    result: z.enum([DailyResult.PASS, DailyResult.FAIL]),
    guessedSpeciesIds: z.array(z.string().transform(SpeciesId)),
  })
  .readonly()

export const statsSnapshotSchema: z.ZodType<StatsSnapshot> = z
  .strictObject({
    history: z.array(dailyPuzzleRecordSchema),
  })
  .readonly()

assert<Equals<StatsSnapshot, z.infer<typeof statsSnapshotSchema>>>()

const STORAGE_KEY = "wortle:temp:2:stats"

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
        logger.error("stats.parseSchema", "Failed to parse stats snapshot from storage", {
          zodError: z.treeifyError(result.error),
        })
        return defaultStats
      }
      return result.data
    } catch (error) {
      logger.error("stats.parseJson", "Failed to parse stats snapshot from storage", undefined, error)
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
