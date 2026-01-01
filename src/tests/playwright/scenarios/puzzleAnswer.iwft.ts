import { test } from "../fixtures"

test("can navigate to puzzle and answer correctly on first try", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.checkScreenshot("puzzle-page")
  await puzzlePage.verifyAttemptCounter(1, 3)
  await puzzlePage.searchForPlant("Daisy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyCorrectAnswer()
})

test("can answer correctly after wrong guesses", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)

  // First wrong guess
  await puzzlePage.searchForPlant("Tansy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyAttemptHistory(1)
  await puzzlePage.verifyAttemptCounter(2, 3)

  // Second wrong guess
  await puzzlePage.searchForPlant("Chicory")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyAttemptHistory(2)
  await puzzlePage.verifyAttemptCounter(3, 3)

  // Correct guess
  await puzzlePage.searchForPlant("Daisy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()
  await puzzlePage.verifyCorrectAnswer()
})

test("fails after 3 wrong guesses", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)

  // Make 3 wrong guesses
  await puzzlePage.searchForPlant("Tansy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()

  await puzzlePage.searchForPlant("Chicory")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()

  await puzzlePage.searchForPlant("Bluebell")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.submitAnswer()

  await puzzlePage.verifyIncorrectAnswer()
})

test("can give up on puzzle", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.giveUp()
  await puzzlePage.verifyGaveUp()
})

test("can choose a different plant", async ({ homePage }) => {
  const puzzlePage = await homePage.clickPuzzle(0)
  await puzzlePage.searchForPlant("Daisy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.chooseDifferentPlant()
  await puzzlePage.verifySearchInputVisible()
  await puzzlePage.searchForPlant("Tansy")
  await puzzlePage.selectFirstPlantOption()
  await puzzlePage.verifySelectedPlantName("Tansy")
})
