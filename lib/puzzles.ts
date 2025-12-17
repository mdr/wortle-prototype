import { Brand } from "effect"
import { SpeciesId, Url } from "./plants"

export type PuzzleId = number & Brand.Brand<"PuzzleId">
export const PuzzleId = Brand.nominal<PuzzleId>()

export type Iso8601Date = string & Brand.Brand<"Iso8601Date">
export const Iso8601Date = Brand.nominal<Iso8601Date>()

export type Degrees = number & Brand.Brand<"Degrees">
export const Degrees = Brand.nominal<Degrees>()

export interface LatLong {
  lat: Degrees
  lng: Degrees
}

export interface PuzzleImage {
  url: Url
  caption: string
}

export interface Puzzle {
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

export const puzzles: Record<PuzzleId, Puzzle> = {
  [PuzzleId(67)]: {
    id: PuzzleId(67),
    date: Iso8601Date("2026-06-10"),
    speciesId: SpeciesId(2), // Tansy
    observationDate: Iso8601Date("2023-08-03"),
    location: "North Yorkshire, England",
    coordinates: { lat: Degrees(53.9788528), lng: Degrees(-1.3101916) },
    habitat: "Flood meadow",
    images: [
      { url: Url("/images/67/plant.jpg"), caption: "Whole plant" },
      { url: Url("/images/67/flower-closeup.jpg"), caption: "Flower heads" },
      { url: Url("/images/67/leaves.jpg"), caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  [PuzzleId(68)]: {
    id: PuzzleId(68),
    date: Iso8601Date("2026-06-11"),
    speciesId: SpeciesId(1), // Devil's-bit Scabious
    observationDate: Iso8601Date("2025-08-13"),
    location: "Northumberland, England",
    coordinates: { lat: Degrees(55.2267806), lng: Degrees(-2.5802806) },
    habitat: "Woodland",
    images: [
      { url: Url("/images/68/flower-head.jpg"), caption: "Flower head" },
      { url: Url("/images/68/flower-rear.jpg"), caption: "Rear view of flower" },
      { url: Url("/images/68/flower-closeup.jpg"), caption: "Close up of flower head" },
      { url: Url("/images/68/leaves.jpg"), caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  [PuzzleId(69)]: {
    id: PuzzleId(69),
    date: Iso8601Date("2026-06-12"),
    speciesId: SpeciesId(11), // Bird's-eye Primrose
    observationDate: Iso8601Date("2024-05-18"),
    location: "North Yorkshire, England",
    coordinates: { lat: Degrees(54.2015), lng: Degrees(-2.3500028) },
    habitat: "Former limestone quarry",
    images: [
      { url: Url("/images/69/plant.jpg"), caption: "Whole plant" },
      { url: Url("/images/69/close-up-of-flowers.jpg"), caption: "Close-up of flowers" },
      { url: Url("/images/69/leaves.jpg"), caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
}

export const getPuzzle = (id: PuzzleId): Puzzle | undefined => puzzles[id]

export const getAllPuzzleIds = (): PuzzleId[] =>
  Object.keys(puzzles).map(Number).map(PuzzleId)
