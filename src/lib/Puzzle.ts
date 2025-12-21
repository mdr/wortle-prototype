import { Brand } from "effect"
import { Degrees, Iso8601Date, Url } from "@/utils/brandedTypes"
import { SpeciesId } from "./Species"

export type PuzzleId = number & Brand.Brand<"PuzzleId">
export const PuzzleId = Brand.nominal<PuzzleId>()

export type Coordinates = {
  latitude: Degrees
  longitude: Degrees
}

export type Location = {
  description: string
  coordinates: Coordinates
}

export type PuzzleImage = {
  url: Url
  caption: string
}

export type Puzzle = {
  id: PuzzleId
  speciesId: SpeciesId
  observationDate: Iso8601Date
  location: Location
  habitat: string
  images: PuzzleImage[]
  photoAttribution: {
    photographer: string
    license: string
  }
}
