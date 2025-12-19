import { expect } from "@playwright/test"
import { PageObject } from "./PageObject"

export class HomePageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get("home-page")).toBeVisible()
      return this
    })

  verifyPuzzleCount = (count: number): Promise<void> =>
    this.step(`verifyPuzzleCount ${count}`, () => expect(this.get("puzzle-link")).toHaveCount(count))
}
