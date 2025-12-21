import { test as ctBase, expect } from "@playwright/experimental-ct-react"
import type { MountResult } from "@playwright/experimental-ct-react"
import { TestApp } from "./TestApp"
import { HomePageObject } from "./pageObjects/HomePageObject"

type MountFunction = (component: React.ReactElement) => Promise<MountResult>

const launchApp = async (mount: MountFunction): Promise<MountResult> => {
  return await mount(<TestApp />)
}

type Fixtures = {
  homePage: HomePageObject
}

export const test = ctBase.extend<Fixtures>({
  homePage: async ({ mount }, use) => {
    const mountResult = await launchApp(mount)
    const homePage = await new HomePageObject(mountResult).verifyIsShown()
    await use(homePage)
  },
})

export { expect }
