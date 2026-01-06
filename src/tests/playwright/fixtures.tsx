import { test as ctBase, expect } from "@playwright/experimental-ct-react"
import type { MountResult } from "@playwright/experimental-ct-react"
import { TestApp } from "./TestApp"
import { HomePageObject } from "./pageObjects/HomePageObject"
import { NotFoundPageObject } from "./pageObjects/NotFoundPageObject"
import { ErrorPageObject } from "./pageObjects/ErrorPageObject"
import { PuzzlePageObject } from "./pageObjects/PuzzlePageObject"

interface MountFunction {
  (component: React.ReactElement): Promise<MountResult>
}

const launchApp = async (mount: MountFunction, initialPath = "/"): Promise<MountResult> => {
  return await mount(<TestApp initialPath={initialPath} />)
}

interface Fixtures {
  homePage: HomePageObject
  notFoundPage: NotFoundPageObject
  errorPage: ErrorPageObject
  archivePage: PuzzlePageObject
}

export const test = ctBase.extend<Fixtures>({
  // eslint-disable-next-line @typescript-eslint/unbound-method
  homePage: async ({ mount }, use) => {
    const mountResult = await launchApp(mount)
    const homePage = await new HomePageObject(mountResult).verifyIsShown()
    await use(homePage)
  },
  // eslint-disable-next-line @typescript-eslint/unbound-method
  notFoundPage: async ({ mount }, use) => {
    const mountResult = await launchApp(mount, "/non-existent-page")
    const notFoundPage = await new NotFoundPageObject(mountResult).verifyIsShown()
    await use(notFoundPage)
  },
  // eslint-disable-next-line @typescript-eslint/unbound-method
  errorPage: async ({ mount }, use) => {
    const mountResult = await launchApp(mount, "/error-test")
    const errorPage = await new ErrorPageObject(mountResult).verifyIsShown()
    await use(errorPage)
  },
  // eslint-disable-next-line @typescript-eslint/unbound-method
  archivePage: async ({ mount }, use) => {
    const mountResult = await launchApp(mount, "/archive/2026-06-08")
    const archivePage = await new PuzzlePageObject(mountResult).verifyIsShown()
    await use(archivePage)
  },
})

export { expect }
