import { Species, SpeciesId, getGenus } from "./Species"

export interface AttemptFeedback {
  speciesId: SpeciesId
  isCorrect: boolean
  genusMatch: boolean
  familyMatch: boolean
}

export const createAttemptFeedback = (attemptedSpecies: Species, correctSpecies: Species): AttemptFeedback => ({
  speciesId: attemptedSpecies.id,
  isCorrect: attemptedSpecies.id === correctSpecies.id,
  genusMatch: getGenus(attemptedSpecies.scientificName) === getGenus(correctSpecies.scientificName),
  familyMatch: attemptedSpecies.family === correctSpecies.family,
})
