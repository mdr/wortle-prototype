import { test } from "../fixtures"

test("can navigate to puzzle and answer correctly", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.searchForPlant("Daisy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyCorrectAnswer()
})
