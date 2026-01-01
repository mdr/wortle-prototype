import { Iso8601Date } from "@/utils/brandedTypes"
import { findFirstScheduledDate } from "@/lib/schedule"
import { toDateFromIso8601Date, toIso8601Date } from "@/utils/dateUtils"

export interface Clock {
  readonly now: () => Date
  readonly todayIso: () => Iso8601Date
}

export class RealClock implements Clock {
  now = (): Date => new Date()
  todayIso = (): Iso8601Date => toIso8601Date(this.now())
}

export class FixedClock implements Clock {
  private readonly fixedDate: Date

  constructor(fixedDate: Date) {
    this.fixedDate = fixedDate
  }

  now = (): Date => new Date(this.fixedDate.getTime())
  todayIso = (): Iso8601Date => toIso8601Date(this.fixedDate)
}

const getDefaultClockDate = (): Date => {
  const firstScheduledDate = findFirstScheduledDate()
  return firstScheduledDate ? toDateFromIso8601Date(firstScheduledDate) : new Date()
}

export const defaultClock: Clock = new FixedClock(getDefaultClockDate())
