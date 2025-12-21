import { Locator, Page } from "@playwright/test"
import type { MountResult } from "@playwright/experimental-ct-react"
import { platform } from "os"
import { expect, test } from "../fixtures"

type TestId = string

interface ScreenshotOptions {
  testIdToCapture?: TestId
  elementsToMask?: Locator[]
}

export abstract class PageObject {
  protected readonly name: string

  constructor(protected readonly mountResult: MountResult) {
    const constructorName = this.constructor.name
    if (!constructorName.endsWith("PageObject")) {
      throw new Error(`Page object class name must end with 'PageObject', but was '${constructorName}'`)
    }
    this.name = constructorName.replace("PageObject", "")
  }

  protected get page(): Page {
    return this.mountResult.page()
  }

  protected step = <T>(name: string, body: () => T | Promise<T>): Promise<T> => test.step(`${this.name}.${name}`, body)

  protected get = (testId: string): Locator => this.page.getByTestId(testId)

  protected getByRole = (role: Parameters<Page["getByRole"]>[0], options?: Parameters<Page["getByRole"]>[1]): Locator =>
    this.page.getByRole(role, options)

  protected getByText = (text: string | RegExp): Locator => this.page.getByText(text)

  expectVisible = (testId: string): Promise<void> =>
    this.step(`expectVisible '${testId}'`, () => expect(this.get(testId)).toBeVisible())

  expectTextVisible = (text: string | RegExp): Promise<void> =>
    this.step(`expectTextVisible '${text}'`, () => expect(this.getByText(text)).toBeVisible())

  checkScreenshot = (name: string, { testIdToCapture, elementsToMask }: ScreenshotOptions = {}): Promise<void> =>
    this.step(`checkScreenshot '${name}'`, async () => {
      if (platform() !== "linux") {
        return
      }
      const locator = testIdToCapture === undefined ? this.mountResult : this.get(testIdToCapture)
      await expect(locator).toHaveScreenshot(`${name}.png`, { mask: elementsToMask })
    })
}
