import { test } from "../fixtures"

test("homepage renders", async ({ homePage }) => {
  await homePage.verifyPuzzleCount(4)
})
