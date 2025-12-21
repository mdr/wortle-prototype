import { PageObject } from "./PageObject"
import { ErrorTestIds } from "@/components/ErrorTestIds"

export class ErrorPageObject extends PageObject {
  verifyIsShown = async (): Promise<this> => {
    await this.expectVisible(ErrorTestIds.page)
    return this
  }
}
