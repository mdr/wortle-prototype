import { test as ctBase, expect } from "@playwright/experimental-ct-react"
import type { MountResult } from "@playwright/experimental-ct-react"
import { TestApp } from "./TestApp"
import { HomePageObject } from "./pageObjects/HomePageObject"
import { NotFoundPageObject } from "./pageObjects/NotFoundPageObject"
import { ErrorPageObject } from "./pageObjects/ErrorPageObject"

type MountFunction = (component: React.ReactElement) => Promise<MountResult>

const launchApp = async (mount: MountFunction, initialPath = "/"): Promise<MountResult> => {
  return await mount(<TestApp initialPath={initialPath} />)
}

type Fixtures = {
  homePage: HomePageObject
  notFoundPage: NotFoundPageObject
  errorPage: ErrorPageObject
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
})

export { expect }
