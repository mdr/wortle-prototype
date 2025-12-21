import { PageObject } from "./PageObject"
import { expect } from "../fixtures"
import { GalleryPageObject } from "./GalleryPageObject"
import { PuzzleTestIds, AnswerTestIds } from "@/components/puzzle/PuzzleTestIds"

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

  gallery = (): Promise<GalleryPageObject> =>
    this.step("gallery", () => new GalleryPageObject(this.mountResult).verifyIsShown())
}
