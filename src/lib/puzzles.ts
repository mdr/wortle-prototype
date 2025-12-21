import { Degrees, Iso8601Date, Url } from "@/utils/brandedTypes"
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
      { url: Url("/images/40/whole-plant.jpg"), caption: "Whole plant" },
      { url: Url("/images/40/flower-close-up.jpg"), caption: "Flower close-up" },
      { url: Url("/images/40/leaves-close-up.jpg"), caption: "Leaves close-up" },
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
      { url: Url("/images/41/plant.jpg"), caption: "Whole plant" },
      { url: Url("/images/41/flower-closeup.jpg"), caption: "Flower close-up" },
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
      { url: Url("/images/42/plant.jpg"), caption: "Whole plant" },
      { url: Url("/images/42/close-up-of-flowers.jpg"), caption: "Close-up of flowers" },
      { url: Url("/images/42/leaves.jpg"), caption: "Leaves" },
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
      { url: Url("/images/43/flower-head.jpg"), caption: "Flower head" },
      { url: Url("/images/43/flower-rear.jpg"), caption: "Rear view of flower" },
      { url: Url("/images/43/flower-closeup.jpg"), caption: "Close up of flower head" },
      { url: Url("/images/43/leaves.jpg"), caption: "Leaves" },
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
      { url: Url("/images/44/plant.jpg"), caption: "Whole plant" },
      { url: Url("/images/44/flower-closeup.jpg"), caption: "Flower heads" },
      { url: Url("/images/44/leaves.jpg"), caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
]

export const getPuzzle = (id: PuzzleId): Puzzle | undefined => allPuzzles.find((p) => p.id === id)

export const getAllPuzzleIds = (): PuzzleId[] => allPuzzles.map((p) => p.id)
