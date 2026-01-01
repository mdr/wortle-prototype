import { PageObject } from "./PageObject"
import { expect } from "../fixtures"
import { PuzzlePageObject } from "./PuzzlePageObject"
import { HomeTestIds } from "@/components/home/HomeTestIds"

export class HomePageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get(HomeTestIds.page)).toBeVisible()
      return this
    })

  verifyPuzzleCount = (count: number): Promise<void> =>
    this.step(`verifyPuzzleCount ${count}`, () => expect(this.get(HomeTestIds.puzzleLink)).toHaveCount(count))

  clickPuzzle = (index: number): Promise<PuzzlePageObject> =>
    this.step(`clickPuzzle ${index}`, async () => {
      await this.get(HomeTestIds.puzzleLink).nth(index).click()
      return new PuzzlePageObject(this.mountResult).verifyIsShown()
    })

  clickDailyPuzzle = (): Promise<PuzzlePageObject> =>
    this.step("clickDailyPuzzle", async () => {
      await this.get(HomeTestIds.dailyPuzzleLink).click()
      return new PuzzlePageObject(this.mountResult).verifyIsShown()
    })
}
