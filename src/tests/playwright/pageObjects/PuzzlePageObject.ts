import { PageObject } from "./PageObject"
import { expect } from "../fixtures"
import { GalleryPageObject } from "./GalleryPageObject"
import { PuzzleTestIds, AnswerTestIds, GuessHistoryTestIds } from "@/components/puzzle/PuzzleTestIds"

export class PuzzlePageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get(PuzzleTestIds.page)).toBeVisible()
      return this
    })

  searchForPlant = (name: string): Promise<void> =>
    this.step(`searchForPlant '${name}'`, () => this.get(PuzzleTestIds.searchInput).fill(name))

  selectFirstPlantOption = (): Promise<void> =>
    this.step("selectFirstPlantOption", () => this.get(PuzzleTestIds.plantOption).first().click())

  submitAnswer = (): Promise<void> => this.step("submitAnswer", () => this.get(PuzzleTestIds.submitAnswer).click())

  verifyCorrectAnswer = (): Promise<void> =>
    this.step("verifyCorrectAnswer", () => expect(this.get(AnswerTestIds.correct)).toBeVisible())

  verifyIncorrectAnswer = (): Promise<void> =>
    this.step("verifyIncorrectAnswer", () => expect(this.get(AnswerTestIds.incorrect)).toBeVisible())

  giveUp = (): Promise<void> => this.step("giveUp", () => this.get(PuzzleTestIds.giveUp).click())

  verifyGaveUp = (): Promise<void> =>
    this.step("verifyGaveUp", () => expect(this.get(AnswerTestIds.gaveUp)).toBeVisible())

  verifyGuessHistory = (count: number): Promise<void> =>
    this.step(`verifyGuessHistory(${count})`, async () => {
      await expect(this.get(GuessHistoryTestIds.container)).toBeVisible()
      await expect(this.get(GuessHistoryTestIds.guessItem)).toHaveCount(count)
    })

  verifyGuessCounter = (current: number, max: number): Promise<void> =>
    this.step(`verifyGuessCounter(${current}/${max})`, () =>
      expect(this.get(PuzzleTestIds.guessCounter)).toHaveText(`Guess ${current} of ${max}`),
    )

  gallery = (): Promise<GalleryPageObject> =>
    this.step("gallery", () => new GalleryPageObject(this.mountResult).verifyIsShown())
}
