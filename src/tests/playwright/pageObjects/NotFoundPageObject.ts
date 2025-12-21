import { PageObject } from "./PageObject"
import { NotFoundTestIds } from "@/components/NotFoundTestIds"

export class NotFoundPageObject extends PageObject {
  verifyIsShown = async (): Promise<this> => {
    await this.expectVisible(NotFoundTestIds.page)
    return this
  }
}
