import { Degrees, Iso8601Date } from "@/utils/brandedTypes"
import { type Puzzle, PuzzleId } from "./Puzzle"
import { SpeciesId } from "./Species"

const allPuzzles: Puzzle[] = [
  {
    id: PuzzleId(40),
    speciesId: SpeciesId(14), // Daisy
    observationDate: Iso8601Date("2025-12-19"),
    location: {
      description: "North Yorkshire, England",
      coordinates: { latitude: Degrees(54.0023389), longitude: Degrees(-1.5102306) },
    },
    habitat: "Road verge",
    images: [
      { imageKey: "40/whole-plant", caption: "Whole plant" },
      { imageKey: "40/flower-close-up", caption: "Flower close-up" },
      { imageKey: "40/leaves-close-up", caption: "Leaves close-up" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  {
    id: PuzzleId(41),
    speciesId: SpeciesId(12), // Herb-Robert
    observationDate: Iso8601Date("2023-07-20"),
    location: {
      description: "North Yorkshire, England",
      coordinates: { latitude: Degrees(53.9991278), longitude: Degrees(-1.5054472) },
    },
    habitat: "Pavement plant",
    images: [
      { imageKey: "41/plant", caption: "Whole plant" },
      { imageKey: "41/flower-closeup", caption: "Flower close-up" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  {
    id: PuzzleId(42),
    speciesId: SpeciesId(11), // Bird's-eye Primrose
    observationDate: Iso8601Date("2024-05-18"),
    location: {
      description: "North Yorkshire, England",
      coordinates: { latitude: Degrees(54.2015), longitude: Degrees(-2.3500028) },
    },
    habitat: "Former limestone quarry",
    images: [
      { imageKey: "42/plant", caption: "Whole plant" },
      { imageKey: "42/close-up-of-flowers", caption: "Close-up of flowers" },
      { imageKey: "42/leaves", caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  {
    id: PuzzleId(43),
    speciesId: SpeciesId(1), // Devil's-bit Scabious
    observationDate: Iso8601Date("2025-08-13"),
    location: {
      description: "Northumberland, England",
      coordinates: { latitude: Degrees(55.2267806), longitude: Degrees(-2.5802806) },
    },
    habitat: "Woodland",
    images: [
      { imageKey: "43/flower-head", caption: "Flower head" },
      { imageKey: "43/flower-rear", caption: "Rear view of flower" },
      { imageKey: "43/flower-closeup", caption: "Close up of flower head" },
      { imageKey: "43/leaves", caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  {
    id: PuzzleId(44),
    speciesId: SpeciesId(2), // Tansy
    observationDate: Iso8601Date("2023-08-03"),
    location: {
      description: "North Yorkshire, England",
      coordinates: { latitude: Degrees(53.9788528), longitude: Degrees(-1.3101916) },
    },
    habitat: "Flood meadow",
    images: [
      { imageKey: "44/plant", caption: "Whole plant" },
      { imageKey: "44/flower-closeup", caption: "Flower heads" },
      { imageKey: "44/leaves", caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
]

export const findPuzzle = (id: PuzzleId): Puzzle | undefined => allPuzzles.find((p) => p.id === id)

export const getAllPuzzleIds = (): PuzzleId[] => allPuzzles.map((p) => p.id)
