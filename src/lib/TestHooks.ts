import { useEffect } from "react"

import { type Iso8601Date } from "@/utils/brandedTypes"

import { type Clock } from "./Clock"

export class TestHooks {
  constructor(private readonly clock: Clock) {}

  setClockDate = (date: Iso8601Date): void => {
    if (!this.clock.setDate) {
      throw new Error("Clock does not support setDate")
    }
    this.clock.setDate(date)
  }
}

export const useInstallTestHooks = (clock: Clock) => {
  useEffect(() => {
    window.testHooks = new TestHooks(clock)
    return () => {
      delete window.testHooks
    }
  }, [clock])
}
