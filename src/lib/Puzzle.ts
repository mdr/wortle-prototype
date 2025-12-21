import { Brand } from "effect"
import { Degrees, Iso8601Date, Url } from "./brandedTypes"
import { SpeciesId } from "./Species"

export type PuzzleId = number & Brand.Brand<"PuzzleId">
export const PuzzleId = Brand.nominal<PuzzleId>()

export type LatLong = {
  lat: Degrees
  lng: Degrees
}

export type PuzzleImage = {
  url: Url
  caption: string
}

export type Puzzle = {
  id: PuzzleId
  date: Iso8601Date
  speciesId: SpeciesId
  observationDate: Iso8601Date
  location: string
  coordinates: LatLong
  habitat: string
  images: PuzzleImage[]
  photoAttribution: {
    photographer: string
    license: string
  }
}
