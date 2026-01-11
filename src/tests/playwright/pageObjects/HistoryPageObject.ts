import { HistoryTestIds } from "@/components/history/HistoryTestIds"

import { expect } from "../fixtures"
import { PageObject } from "./PageObject"

export class HistoryPageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get(HistoryTestIds.page)).toBeVisible()
      return this
    })

  verifyEmptyState = (): Promise<void> =>
    this.step("verifyEmptyState", () => expect(this.get(HistoryTestIds.emptyState)).toBeVisible())

  verifyHistoryItemCount = (count: number): Promise<void> =>
    this.step(`verifyHistoryItemCount ${count}`, () => expect(this.get(HistoryTestIds.historyItem)).toHaveCount(count))

  verifyStatsVisible = (): Promise<void> =>
    this.step("verifyStatsVisible", async () => {
      await expect(this.getByText("Statistics")).toBeVisible()
      await expect(this.getByText("quizzes played")).toBeVisible()
    })
}
