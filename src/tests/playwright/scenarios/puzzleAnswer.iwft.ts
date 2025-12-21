import { test } from "../fixtures"

test("can navigate to puzzle and answer correctly", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.searchForPlant("Daisy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyCorrectAnswer()
})

test("can navigate to puzzle and answer incorrectly", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.searchForPlant("Tansy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyIncorrectAnswer()
})

test("can give up on puzzle", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.giveUp()
  await puzzlePage.verifyGaveUp()
})
