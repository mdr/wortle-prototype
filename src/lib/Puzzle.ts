import { Brand } from "effect"
import { Degrees, Iso8601Date } from "@/utils/brandedTypes"
import { SpeciesId } from "./Species"

export type PuzzleId = number & Brand.Brand<"PuzzleId">
export const PuzzleId = Brand.nominal<PuzzleId>()

export interface Coordinates {
  latitude: Degrees
  longitude: Degrees
}

export interface Location {
  description: string
  coordinates: Coordinates
}

export interface PuzzleImage {
  /** Image key for R2, e.g., "40/whole-plant" */
  imageKey: string
  caption: string
}

export interface Puzzle {
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
