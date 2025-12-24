import { Species, SpeciesId, getGenus } from "./Species"

export type GuessFeedback = {
  speciesId: SpeciesId
  isCorrect: boolean
  genusMatch: boolean
  familyMatch: boolean
}

export const createGuessFeedback = (guessedSpecies: Species, correctSpecies: Species): GuessFeedback => ({
  speciesId: guessedSpecies.id,
  isCorrect: guessedSpecies.id === correctSpecies.id,
  genusMatch: getGenus(guessedSpecies.scientificName) === getGenus(correctSpecies.scientificName),
  familyMatch: guessedSpecies.family === correctSpecies.family,
})
