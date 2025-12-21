import { PageObject } from "./PageObject"
import { expect } from "../fixtures"
import { PuzzlePageObject } from "./PuzzlePageObject"

export class HomePageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get("home-page")).toBeVisible()
      return this
    })

  verifyPuzzleCount = (count: number): Promise<void> =>
    this.step(`verifyPuzzleCount ${count}`, () => expect(this.get("puzzle-link")).toHaveCount(count))

  clickPuzzle = (index: number): Promise<PuzzlePageObject> =>
    this.step(`clickPuzzle ${index}`, async () => {
      await this.get("puzzle-link").nth(index).click()
      return new PuzzlePageObject(this.mountResult).verifyIsShown()
    })
}
