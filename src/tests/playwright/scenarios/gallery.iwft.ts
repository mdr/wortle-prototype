import { expect, test } from "../fixtures"

test("can navigate gallery with buttons", async ({ homePage }) => {
  const puzzle = await homePage.clickPuzzle(0)
  const gallery = await puzzle.gallery()

  await gallery.verifyCaption("Whole plant")
  await gallery.clickNext()
  await gallery.verifyCaption("Flower close-up")
  await gallery.clickNext()
  await gallery.verifyCaption("Leaves close-up")
  await gallery.clickNext()
  await gallery.verifyCaption("Whole plant")
  await gallery.clickPrev()
  await gallery.verifyCaption("Leaves close-up")
})

test("can navigate gallery with thumbnails", async ({ homePage }) => {
  const puzzle = await homePage.clickPuzzle(0)
  const gallery = await puzzle.gallery()

  await gallery.verifyCaption("Whole plant")
  await gallery.clickThumbnail(2)
  await gallery.verifyCaption("Leaves close-up")
  await gallery.clickThumbnail(1)
  await gallery.verifyCaption("Flower close-up")
  await gallery.clickThumbnail(0)
  await gallery.verifyCaption("Whole plant")
})

test("can open fullscreen and navigate", async ({ homePage }) => {
  const puzzle = await homePage.clickPuzzle(0)
  const gallery = await puzzle.gallery()

  const fullscreen = await gallery.openFullscreen()
  await fullscreen.verifyCaption("Whole plant")
  await fullscreen.clickNext()
  await fullscreen.verifyCaption("Flower close-up")
  await fullscreen.clickPrev()
  await fullscreen.verifyCaption("Whole plant")
  await fullscreen.close()

  await gallery.verifyCaption("Whole plant")
})

test("can zoom fullscreen with keyboard shortcuts", async ({ homePage }) => {
  const puzzle = await homePage.clickPuzzle(0)
  const gallery = await puzzle.gallery()

  const fullscreen = await gallery.openFullscreen()
  const initialScale = await fullscreen.getTransformScale()

  await fullscreen.pressZoomInKey()
  await expect.poll(() => fullscreen.getTransformScale()).toBeGreaterThan(initialScale)

  const zoomedScale = await fullscreen.getTransformScale()
  await fullscreen.pressZoomOutKey()
  await expect.poll(() => fullscreen.getTransformScale()).toBeLessThan(zoomedScale)
})
