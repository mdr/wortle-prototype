import { expect } from "@playwright/test"
import { PageObject } from "./PageObject"

export class PuzzlePageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get("puzzle-page")).toBeVisible()
      return this
    })

  searchForPlant = (name: string): Promise<void> =>
    this.step(`searchForPlant '${name}'`, () => this.get("plant-search-input").fill(name))

  selectFirstPlantOption = (): Promise<void> =>
    this.step("selectFirstPlantOption", () => this.get("plant-option").first().click())

  submitAnswer = (): Promise<void> => this.step("submitAnswer", () => this.get("submit-answer").click())

  verifyCorrectAnswer = (): Promise<void> =>
    this.step("verifyCorrectAnswer", () => expect(this.get("answer-correct")).toBeVisible())

  verifyIncorrectAnswer = (): Promise<void> =>
    this.step("verifyIncorrectAnswer", () => expect(this.get("answer-incorrect")).toBeVisible())
}
