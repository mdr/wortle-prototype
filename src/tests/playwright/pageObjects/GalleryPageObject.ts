import { PageObject } from "./PageObject"
import { expect } from "../fixtures"
import { GalleryTestIds, FullscreenTestIds } from "@/components/puzzle/imageGallery/GalleryTestIds"

export class GalleryPageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get(GalleryTestIds.gallery)).toBeVisible()
      return this
    })

  verifyCaption = (caption: string): Promise<void> =>
    this.step(`verifyCaption '${caption}'`, () => expect(this.get(GalleryTestIds.caption)).toHaveText(caption))

  clickNext = (): Promise<void> => this.step("clickNext", () => this.get(GalleryTestIds.next).click())

  clickPrev = (): Promise<void> => this.step("clickPrev", () => this.get(GalleryTestIds.prev).click())

  clickThumbnail = (index: number): Promise<void> =>
    this.step(`clickThumbnail ${index}`, () => this.get(GalleryTestIds.thumbnail).nth(index).click())

  openFullscreen = (): Promise<FullscreenViewerPageObject> =>
    this.step("openFullscreen", async () => {
      await this.get(GalleryTestIds.fullscreen).click()
      return new FullscreenViewerPageObject(this.mountResult).verifyIsShown()
    })
}

export class FullscreenViewerPageObject extends PageObject {
  verifyIsShown = (): Promise<this> =>
    this.step("verifyIsShown", async () => {
      await expect(this.get(FullscreenTestIds.viewer)).toBeVisible()
      return this
    })

  verifyCaption = (caption: string): Promise<void> =>
    this.step(`verifyCaption '${caption}'`, () => expect(this.get(FullscreenTestIds.caption)).toHaveText(caption))

  clickNext = (): Promise<void> => this.step("clickNext", () => this.get(FullscreenTestIds.next).click())

  clickPrev = (): Promise<void> => this.step("clickPrev", () => this.get(FullscreenTestIds.prev).click())

  close = (): Promise<void> =>
    this.step("close", async () => {
      await this.get(FullscreenTestIds.close).click()
      await expect(this.get(FullscreenTestIds.viewer)).not.toBeVisible()
    })
}
