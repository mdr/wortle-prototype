import { ErrorTestIds } from "@/components/ErrorTestIds"

import { PageObject } from "./PageObject"

export class ErrorPageObject extends PageObject {
  verifyIsShown = async (): Promise<this> => {
    await this.expectVisible(ErrorTestIds.page)
    return this
  }
}
