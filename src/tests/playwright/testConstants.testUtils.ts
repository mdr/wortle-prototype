import { getSpecies } from "@/lib/plants"
import { PuzzleId } from "@/lib/Puzzle"
import { getPuzzle } from "@/lib/puzzles"
import { findFirstDateForPuzzle } from "@/lib/schedule"
import { Iso8601Date } from "@/utils/brandedTypes"

export interface TestPuzzle {
  id: PuzzleId
  correctAnswer: string
  scheduledDate: Iso8601Date | undefined
}

const createTestPuzzle = (puzzleId: PuzzleId): TestPuzzle => {
  const puzzle = getPuzzle(puzzleId)
  const species = getSpecies(puzzle.speciesId)
  const scheduledDate = findFirstDateForPuzzle(puzzleId)
  return {
    id: puzzleId,
    correctAnswer: species.commonNames[0],
    scheduledDate,
  }
}

export const TestPuzzles = {
  daisy: createTestPuzzle(PuzzleId(40)),
  herbRobert: createTestPuzzle(PuzzleId(41)),
  birdsEyePrimrose: createTestPuzzle(PuzzleId(42)),
  devilsBitScabious: createTestPuzzle(PuzzleId(43)),
  tansy: createTestPuzzle(PuzzleId(44)),
} as const
